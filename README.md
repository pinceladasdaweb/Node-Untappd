Node Untappd
=================

Display your latest activity in Untappd with Node.js and jQuery.

![](https://raw.github.com/pinceladasdaweb/Node-Untappd/master/screenshot.png)

##Usage

1 - The Untappd API require you register an application. Register your [here](https://untappd.com/api/register?register=new). Fill in the app.js file with your Client ID and Client Secret.

2 - From within a script tag or a JS file:

```javascript
Untappd.init({
    template: $('#untappd-template').html(),  // The ID of your template
    container: $('#stream'),                  // domNode to attach to
    username: 'pinceladasdaweb'               // Untappd username
});
```

##Customize Template

1 - To customize the template open the views/index.html file and look for the following block of code:

```javascript
<script id="untappd-template" type="text/x-handlebars-template">
    {{#each this}}
    {{user @index}}
    <div id="checkin-{{id}}" class="checkin cf">
        <img class="beer-label" src="{{beerLabel}}" alt="{{beer}}">
        <div class="beer">
            <p>{{beer}}</p>
            <span>{{company}}</span>
        </div>
        {{#if comments}}
        <p class="comment"></p>
        {{/if}}
        <span class="rating r{{ratingCount rating}}"></span>
        <footer>
            {{#if venueId}}
            <p class="location"><a href="https://untappd.com/venue/{{venueId}}" title="{{venueName}}">{{venueName}}</a></p>
            {{/if}}
            <div class="footer-time">
                <time>{{published createdAt}}</time>
                <a class="checkin-page hide-text" href="https://untappd.com/user/{{username}}/checkin/{{id}}" title="Checkin Page">Checkin Page</a>
            </div>
        </footer>
    </div>
    {{/each}}
</script>
```

Change the HTML as it deems necessary.