# Magic Cubby

## About
Magic Cubby is an implementation of an idea I had in November of 2013. The gist is a way of displaying and remixing youtube videos. My main usecase for the time being is to create a way to "play" what I consider to be a form of visual poetry.

I [wrote a poem](https://gist.github.com/ultimape/20987a72c8107f965b63) using various video's from Ze Frank's second series that I want people to be able to watch along with. I'm hoping to make something that lets others create similar poems and other creative narratives.

Magic Cubby is a small part of a longer term project I've been working toward that I call "WovenSoup". I'd love to create an ecosystem around remixing and sharing video content - branching out into music genres (vaporwave?) and things like video mashups, supercuts, and [eventually developing it into into a collaborative research platform](https://twitter.com/ultimape/status/803584705882886144).


## Design/Goals/Features
I don't have an explicit design in mind, but I have a long list of [high-level goals for the project](https://twitter.com/ultimape/status/792854975802142720) over on twitter.

This is meant to be a standalone (and eventually offline) html project, however there might be a need to run a small bit of code (serverless?) to talk to the youtube API to gather video data, and hopefully in the future some way of storing and sharing custom video sets.

My big focus is to [avoid requireing a centralized service entirely](https://twitter.com/ultimape/status/796112771096186886) if possible. If this takes off I don't want to be the centralized arbiter for sharing. I'd hate to create a platform for visual poetry that would die like so many others have in the past. Services like Vine and Reddittv gave me a lot of joy and I still miss them.

An ideal implementation would let people create & share poems entirely peer2peer from their browsers and publish poems that can be embedded in blogs or as standalone webpages that only require access to the video services to play back the videos. My hope is to implement something like Operational Transforms being used to give users a shared workspace if this gets any traction.

I've also thought a lot about [how to build an ecosystem](https://twitter.com/ultimape/status/792976533698797568) that creates buy-in for both the creators of these videos as well as the superfans who want to [contribute to the larger discussion](https://twitter.com/ultimape/status/799399664369991680). 

I've included the text from my original idea I had emailed to Ze in 2012 below.


## Brain-Crack (the original idea)
>Hello Ze.
>
>I wanted to start a list of books from your cubby, but didn't know if that was already a thing or if you had something planned for them.
>
>I have a strong desire to catalog the books on an interactive website that "follows along" with your show, and then link them to amazon (maybe with an affiliate link?) along with other resources. I'm proud of my list of wishes on amazon. I'd like to take that passion and make something useful out of it. I figure that I could leverage your popularity to get myself a little pocket change, as well as help people to share the knowledge that is hidden in your cubby.
>
>I am fascinated by the books on your magic cubby, especially since they are ones that I've read, or really want to read. I'm constantly thinking to mysef "Aha! its that book!"
>
>I really enjoy collecting books. I also like reading them. I've got over 800 books that I want to read, and no money to buy them. You can see my amazon wishist here: http://amzn.com/w/1J7B32ISP806W
>
>I don't want to move forward on this unless I have your blessing (and/or interest). I'd hate to inadvertently step on your toes if you had something planned. I get the sneaking suspicion that the internet is really an elaborate ruse to sell books.
>
>Either way, I plan on at least compiling an amazon wishlist if nothing else. I've started writing the books down in an excel sheet, and plan on adding them here:  http://amzn.com/w/3MEAD5TM6AQBW


## Influences
Magic-Cubby is an offshoot of playing around with youtube's api to loop small segments of Zefrank making 'poop' noises.

I quickly realized that I could turn this into a format for displaying all the books in Ze's "Magic Cubby", a project I had thought about previously, but never started.

I'm also inspried by my friend's use of windows metadata tagging features to mark content in the videos via the filesystem. He had marked his collection of the original "The Show" .avi files, and I started doing it myself because it was useful for recalling the fun songs and interesting idea, and allowed for seraching via keywords.

Being able to share little bits of zefrank to cheer each other up was something I enjoyed, but I wish was something we could do more collaboratively.


## How to use
I had a version up on dropbox for a while, but they stopped letting you view html pages from 'public' due to abuse.

For the time being, you can run this by navigating to [https://magic-cubby.glitch.me](https://magic-cubby.glitch.me) and I plan on developing it on that platform because [I believe strongly in many of the core design decisions behind it](https://twitter.com/ultimape/status/842053413605117952).

## Disclaimer
This is a proof of concept.

There will be bugs. For the time being there will only be the live in-development version until I reach something worth packaging up as a release.

The nature of this being a explorative prototype means I'll be writing a lot of klugey bullshit and not make much attempt to write clean code. The code is messy and while I will be doing clean-up as I go, don't expect much. There will likely be a lot of "code smell".

My css styling will also be bear minimum for the proejct to work on my laptop & cellphone with no aim to do cross-browser testing. I'm sorry.


## Contact / Collaborate / Contribute
While this is primarily a solo project for the time being as I try to excorcise my demons and fleshing out my ideas, I am open to collaborating. Feel free to contact me on [Mastodon](https://mastodon.social/@ultimape) [Twitter](twitter.com/ultimape) or via [keybase](https://keybase.io/ultimape).

If you would like to learn more about my background, My out-of-date 'cv' is [available on stackoverflow](https://stackoverflow.com/users/story/42082?view=Cv). 

You can also help me [avoid starving](https://www.patreon.com/ultimape) or buy me a [coffee](https://www.paypal.me/) if you feel the need to do so.