# Project Name #

<!--
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows.

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->

## Heading ##
  > Name the product in a way the reader (i.e. your target customers) will understand.

## Sub-Heading ##
  > Describe who the market for the product is and what benefit they get. One sentence only underneath the title.

## Summary ##
  > Give a summary of the product and the benefit. Assume the reader will not read anything else so make this paragraph good.

## Problem ##
  > Describe the problem your product solves.

## Solution ##
  > Describe how your product elegantly solves the problem.

## Quote from You ##
  > A quote from a spokesperson in your company.

## How to Get Started ##
  > Describe how easy it is to get started.

## Customer Quote ##
  > Provide a quote from a hypothetical customer that describes how they experienced the benefit.

## Closing and Call to Action ##
  > Wrap it up and give pointers where the reader should go next.

.................................................................................................

Food Voting App

This app is to help Hack Reactor students who want to get a meal together to select a food type and restaurant to go to within walking distance.

The homepage will have an entry form to place your name, the food you are interested in, and a restaurant (optional) you are interested in.

You can edit/modify, add, and delete existing entries and vote for an entry.

The app will utilize the entry with the most votes and use the yelp api to randomly pick 1 of the 5 closest restaurants with the highest ratings that serve that type of food.

Finally, the app will use the google maps api to display a map with the walking route to that selected restaurant.

Plan:
Utilize general buildout of todo list code I've partly put together and modify it for food voting

.................................................................................................

Boggle

This app will generate an n x n board of random lowercase letters

As in Boggle, the goal is find as many actual English dictionary words in the board.

Restrictions:
  string of letters of length >= 3
  adjacent letters (todo for later, a bit to complicated to implement for mvp)
  can't use a letter that you have used before (can use repeated letters)

The app will use the mw dictionary api to check strings to see if they are actual words in the English dictionary

Plan:
Start with 4x4 board of 16 letters = array of 16 letters
Check if words are valid: formed from combination of letters, have not already been submitted (unique, non-repeats), are actual words in the English dictionary (download an English dictionary json file or use a dictionary API)
Add restrictions one by one, as I have time
If I get this far, scramble letters every 10 seconds

Update:
I built the todo list app on the first day but scrapped it at the end of the first day.
I started the Boggle project basically at the start of the second day of the MVP sprint. In one day, I actually accomplished all of my primary goals and fulfilled all of my personal requirements for it to be minimally viable.

Capabilities:
Checks if words are valid, did not implement the adjacent letter blocks rule
Calculates points based on word length and keeps a cumulative point score.
Angular's two way binding feature highlights the text in red the user is typing if the words are not valid
Words can be added and removed from a mongodb database. Added words persist when page is refreshed.
