<app>
  <overview ref="overview_page"></overview>
  <script>
    var self = this;
    self.data = [
        { id: "overview", ref: "overview_page"}
    ]

    route(function(id) {
        self.page = self.data.filter(function(r) { return r.id == id })[0] || self.data[0];

        if (self.currentPage) {
            self.currentPage.setVisibility(false);
        }

        var nextPage = self.refs[self.page.ref];
        nextPage.setVisibility(true);
        self.currentPage = nextPage;
    })

    var appmodel = {
        user: null,
        "fetchUserData" : function() {
            var self = this;
            if (this.user) {
                self.trigger("update_user", this.user);
                return;
            }
            fetch('/userdata', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/JSON; charset=utf-8'
                },
                credentials: 'include'
            }).then(function(response) {
                response.json().then(function(json) {
                    self.user = json.user;
                    self.trigger("update_user", json.user);
                });
            });
        }
    }

    riot.observable(appmodel);
    riot.mixin({"appmodel":appmodel});

  </script>
</app>
