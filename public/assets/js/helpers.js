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