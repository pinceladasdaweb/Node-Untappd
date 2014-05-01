Handlebars.registerHelper("ratingCount", function (counter) {
    var num = counter.toString(),
        n   = num.replace('.', '-');
    return n;
});

Handlebars.registerHelper("published", function () {
    return moment(Date.parse(this.createdAt)).format('h:mm A D MMM YYYY');
});

Handlebars.registerHelper('user', function (index) {
    if (index < 1) {
        var name     = this.name,
            username = this.username,
            avatar   = this.avatar,
            tpl      = [
                '<div class="user cf">',
                    '<img class="avatar" src="'+avatar+'" alt="'+name+'">',
                    '<p class="name"><a href="https://untappd.com/user/'+username+'" title="Untappd profile" rel="extrenal">'+name+'</a></p>',
                    '<span>Latest Check-ins</span>',
                '</div>'
            ].join('\n');
        return new Handlebars.SafeString(tpl);
    }
});

var Untappd = {
    init: function (config) {
        this.url = '/checkins?user=' + config.username;
        this.template = config.template;
        this.container = config.container;
        this.fetch();
    },
    handleError: function (data) {
        this.container.empty().append('<p class="error">'+data+'</p>');
    },
    attachTemplate: function () {
        var template = Handlebars.compile(this.template);

        this.container.empty().append(template(this.untappd));
    },
    fetch: function () {
        var self = this;
        
        $.getJSON(self.url, function (data) {
            var apiStatus = data.meta.code;

            if (apiStatus === 200) {
                var checkins = data.response.checkins.items;

                self.untappd = $.map(checkins, function (beers) {
                    return {
                        id: beers.checkin_id,
                        avatar: beers.user.user_avatar,
                        name: beers.user.first_name,
                        username: beers.user.user_name,
                        beer: beers.beer.beer_name,
                        beerLabel: beers.beer.beer_label,
                        company: beers.brewery.brewery_name,
                        comments: beers.checkin_comment,
                        rating: beers.rating_score,
                        venueId: beers.venue.venue_id,
                        venueName: beers.venue.venue_name,
                        createdAt: beers.created_at
                    }
                });

                self.attachTemplate();
            } else {
                self.handleError(data.meta.error_detail);
            }
        });
    }
};