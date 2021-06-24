:sparkles: Hello! :sparkles:

Welcome to `sparkle-scss`, a simple and lightweight foundation for creating new style sets with sass. This theming set is made to be easily used with any site/cms, but does show a small amount of love for Drupal, since that is our specialty here at Mythic Digital. Notes and examples for our project variables, mixins, functions, and utility classes can be found in our documentation, [here](http://sparkle.mythicdigital.io). Read on the get some basic info about suggested naming conventions, a quick tour of the overall theme architecture and some helpful tips on using sparkle for your next theming adventure.

## Naming conventions
### Class names
For our styles, we overall follow the same conventions as the BEM methodology. You can read an excellent example of how this works here: [BEM — Block Element Modifier](http://getbem.com/naming/)

In addition to following the guidelines above, we also add a like to add a bit of context to a class name by prefixing it with an abbreviation of what it is. For example, content types are prefaced with `ct-article` or `ct-page`. A display might be named `d-card` or `d-teaser`.  Same sort of thing applies for utility classes, which we start with a `u`, i.e. `u-screen-reader-text`. This convention isn’t always useful for things like the header, pagination, etc. so we can either use an ‘e’ for element in those situations, or simply leave it off entirely (`e-header` or `header`). Make sure to just use one dash in this convention, since we reserve two dashes for signifying a modifier in BEM (more info above).

### File names
To keep things simple, we use a similar structure to BEM for our class names. Files should be named with something meaningful and placed in the appropriate folder, like `_article.scss` in the `content-types` folder, and overrides should add a modifier on the end with two dashes in-between, like `_article--card.scss`.

## Theme Tour 🚗 
In this section we’ll provide a little overview to the overall use of each predefined main folder within the `sass` directory. These will make up the overall organization of your theme, so understanding their intention is important if you want to prevent your theme from becoming a tangled up mess.

### devtools

This folder, which currently only has one item in in it (more like dev_tool_, amirite?), is intended to hold any utility type styles that you might want to turn on for development purposes only. 

For example, the tool that currently exists in that folder is a visual grid utility that allows you to place a visual grid on a container while you are working on styling items within it. It can make lining things up properly a bit easier if you’re unsure of how your styles might truly be applying. Make sure you turn these tools off before pushing up code to any environment that isn't your local.


### settings

As the name suggests, this is a folder of variables that control how different aspects of the theme are set. One of the first things you do when beginning a new project with Sparkle will be to come into this folder and set the colors, fonts, spacing and other visual settings that will make this theme look like yours. Any variables set in this file are used globally, more specific variables can be set at the top of the file or code block they belong to for ease of use.


### universal

These are styles we’re applying directly to the element tag, no classes or specificity of selector is involved. They define the default base for what our theme looks like unaltered by our design layer, so the styling for these element should be on the minimal side. Try to only apply styles to these elements that you feel would be truly universal to its element anywhere it is rendered.

### utilities

A folder for mixins and functions, as well as any utility classes you’d like to add to your theme. There are a few that we find useful in there to give you an idea of what you might use these for. This directory has been divided into 3 subdirectories for each of the types, and they are split into different files for ease of finding. Sometimes, especially in the case of utility classes, it may make more sense to combine multiple things into one file. Just try to pick a useful file name for situations like this. For example, all of the utility classes we provide for the WYSIWYG might go in a `_wysiwyg-classes.scss` file. 


### specifics

And finally, the meat of your theme. This is where the bulk of your styling work will happen after initial setup. Any styles that are applied to specific elements or classes (besides utility classes), lives here. 

The organization has been broken down into different parts that we commonly like to use, but not all of them will be applicable for a given project. 

#### Overrides
Within each organizational folder mentioned above, you’ll find an `overrides` folder. This is meant to be used for slight tweaks to existing styles that happen for particular scenarios. It may be best illustrated with an example.

##### Example overrides scenario
Say you are given the task to style card display for articles on your website. You might make a `_card.scss` file within the `displays` folder, and add your styles there. Great! You’ve got card styles. Task closed. 

Your next task pops up, styling the card display for an author. These cards look just like the cards for article, so this should be easy! You add all the classes for card styles to your author card template and BAM! It looks perfect….oh, never mind, there’s actually one difference for these cards.   Author cards get a slightly different image treatment than regular article cards. What should we do now? 

We could make two separate files, `_author-card.scss` and `_article-card.scss`, but that’s not really necessary since these two displays have so much in common. Instead, you might use the `overrides` folder in this scenario to create a special exception for author. To do this, we’ll start by navigating to our author card template again and changing the class setting for the card container from just `card` to `card card--author`.  Next, we’ll  make a new file inside `displays/overrides` and name it `_card--author.scss` We’ll open this file with the `card--author` modifying class and we can write our special image styles for an author card right in here. This setup is ideal because it allows our author card to inherit the generic styles of a card and only changes the small piece that should be different, keeping our site styles looking consistent and our theme base nice and DRY. 

#### Choosing a structure

It’s beneficial to take a few moments during your project setup to decide which of the default folders within the `display`directory you’d like (maybe add even add some of your own!), and delete the ones you don’t need.  Many of the default folders in this structure are particularly suited for use with Drupal, so you depending on the project these may be perfect for you or totally off base.  If you are unsure what you need, feel free to leave these and adapt them as you develop your project. 

##### Structuring by Display vs Type

In the overrides example scenario above, we show you how a theme structure may look if you choose to style based on a display type, like `card`, and gave overrides by content type for small changes therein. This structure works particularly well for any site where the displays for each content type share a lot of similarities. (i.e., the card displays look mostly the same with few exceptions, as well as the overall layout of the detail pages etc.). If you’re able, it’s best to take a look at all of the given designs for a display (so all of the differently designed `card` displays in this scenario), and identify what they have in common. Put those common styles in the base `_card.scss` file and everything else goes into one of our overrides.

> *A note about why we keep our overrides in a folder for the curious:*
> Aside from extra organization, keeping our overrides in a folder one level deeper than our base file ensures that they will come after our base file in the final css structure. This is important because css reads from top to bottom, and we need to make sure our overrides come out after our base styles. Because we use globbing to automatically pickup the files within the `specifics` folder, we have no other way of ensuring that this happens as they would otherwise be written out alphabetically.

If you instead have a site where the displays of content are drastically different from content type to content type, you may find it easier to structure and override by type instead. In this scenario, it’s best to take a look at all of the displays you will be styling for a given content type and see what they have in common. Those styles will go in a base file, like `_article.scss` for example. Then, in the overrides folder, you could make new files for `_article--card.scss` and `_article--detail-page.scss`, for example.  You’d likely want to use the `content-type` (or a similarly named folder) to organize these styles. 

## Compilation
We use `gulp` to compile our `scss` into `css`, but you may use whatever compilation method you wish. If you’d like to use gulp, check out our `gulpfile.js` in the root of the repo for an idea of how we like to do it. You’ll see the required gulp plugins listed at the top, so make sure you include those in your project as well. 

### Prefer to use something other than gulp?

No problem! As a quick FYI, our project is setup to rely on globbing. You may need to setup a similar feature with whatever you use, or otherwise you will need to manually import each file by name instead of by wildcard.
