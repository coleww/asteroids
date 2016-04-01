AVASTAROIDS
-----------------------------

a twitter bot thats let u fight the demons and frigging win because it will continuously generate new games until that happens cuz it is just such a nice bot

-------------------------

# DEVLOPMENT

- [install cairo](https://github.com/Automattic/node-canvas/wiki)
- `git clone` or what have you and a lil `cd` and then an `npm install`
- put some API keys for a test account in `make_a_sweet_gif/config.js`
- `redis-server` (also: install redis-server)
- when a follower tweets @ the bot, it should push them onto the redis queue
- `node make_a_sweet_gif/index.js` should do the magic (it will take a few seconds)
- you can run `node qpf.js` to make the bot auto-follow back anyone that follows it. 

-------------------------

TODO:
- make it work in node
- make it make gifs
- copy paste streaming redis system from wowwwwbeautiful (p sure u get the avatar URL when streaming events occur)
- *some sort of callback mess to grab users avatar, make a gif, and reply* 
- get more objects for the asteroids/"bad things". maybe word art like STRESS, ANXIETY, HATE, etc. also demons,  businessmen, etc.
- maybe let people @ the bot images for the background? NOT THE ASTEROIDS THO.  
- HOLY SHIT make backgrounds work at launch, that way if people tweet like "HEY CHECK OUT WHAT THIS DID" it will do it again :o
- oh gosh, could it draw on top of existing gifs? :o just crack open the frames and step() over them? 
--------------------------------

This code was originally written w/ [Jack Noble](https://github.com/jacknoble/asteroids) at app academy, 
i was just too lazy to re-write the basic asteroids logic for this bot lol
