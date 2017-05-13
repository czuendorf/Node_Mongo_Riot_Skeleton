<app>
  <overview ref="overview_page"></overview>
  <script>
    var self = this;
    self.data = [
        { id: "overview", ref: "overview_page"}
    ];

    route(function(id) {
        self.page = self.data.filter(function(r) { return r.id == id })[0] || self.data[0];

        if (self.currentPage) {
            self.currentPage.setVisibility(false);
        }

        var nextPage = self.refs[self.page.ref];
        nextPage.setVisibility(true);
        self.currentPage = nextPage;
    });

  </script>
</app>
