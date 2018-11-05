from rdflib import Graph, Namespace, RDF, URIRef, plugin
from rdflib.serializer import Serializer
from rdflib.namespace import DC, FOAF

#Requires the Gutenberg catalog to be downloaded so it can be parsed.
path = './Gutenberg/cache/epub/'

gcatalog = list()

maxfile = 52000
interval = 1000
for i in xrange(1, maxfile):
    if not i % interval:
        print("Book %d\n"%i)
            
    
    fpath = path + str(i) + '/pg' + str(i)+ '.rdf'
    
    try:
        f = open(fpath, 'r')

    except:
        continue
    
    testrdf = f.read()

    f.close()

    g = Graph().parse(data=testrdf, format='xml')
    #print(g.serialize(format='n3', indent=4))

    graphnames = dict(g.namespaces())

    dc = graphnames['dcterms']
    pg = graphnames['pgterms']

    titleref = dc + 'title'
    agentref = pg + 'agent'
    shelfref = pg + 'bookshelf'
    nameref =  pg + 'name'

    book = dict()
    try:
        book['id'], book['title'] = next(g.subject_objects(titleref))
        _, _, book['author'] = next(g.triples((None, nameref, None)))
    except:
        pass

    book['bookshelf'] = list()
    for s, p, o in list(g.triples((None, shelfref, None))):
        
        shelf = (o, None, None)
        try:
            book['bookshelf'].append(str(next(g.triples(shelf))[2]))
        except:
            pass

    #for k in book.keys():
    #        print("%s: %s"%(k, book[k]))

    gcatalog.append(book)

category = 'Poetry'
	
print "Looking for %s bookshelf...\n"%category

for b in gcatalog:
    if category in b['bookshelf']:
        print(b['id'])
    
