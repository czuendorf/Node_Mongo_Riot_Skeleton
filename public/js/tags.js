riot.tag2('app', '<overview ref="overview_page"></overview>', '', '', function(opts) {
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

});

riot.tag2('actionbutton', '<span>{opts.caption}</span>', 'actionbutton { display: inline-flex; user-select: none; align-items: center; justify-content: center; font-family: Helvetica; font-weight: bold; background: grey; color: white; padding-left: 1rem; padding-right: 1rem; border-radius: 5px; text-align: center; min-height: 2rem; cursor: pointer; }', 'onclick="{onClick}"', function(opts) {

  this.onClick = function() {
    if (opts.href) {
      location.href = opts.href;
    }
  }.bind(this)

});

riot.tag2('backbutton', '<span>Back</span>', 'backbutton { padding-left: 0.5rem; padding-right: 0.5rem; user-select: none; display: inline-flex; justify-content: center; align-items: center; margin-right: 0.5rem; background: grey; color: white; border-radius: 5px; min-height: 2rem; text-align: center; cursor: pointer; }', 'onclick="{onClickBack}"', function(opts) {

  this.onClickBack = function() {
    window.history.back();
  }.bind(this)

});

riot.tag2('buttonbox', '<yield></yield>', 'buttonbox { display: flex; padding: 0.5rem; } buttonbox actionbutton { flex: 1; } buttonbox actionbutton + actionbutton { margin-left: 0.5rem; }', '', function(opts) {
});

riot.tag2('deletebutton', '<span>X</span>', 'deletebutton { display: inline-flex; user-select: none; align-items: center; justify-content: center; font-family: Helvetica; background: red; color: white; border-radius: 50%; text-align: center; width: 2rem; height: 2rem; cursor: pointer; }', '', function(opts) {
});

riot.tag2('eventbutton', '<span>{opts.caption}</span>', 'eventbutton { display: inline-flex; user-select: none; align-items: center; font-family: Helvetica; background: grey; color: white; padding-left: 1rem; padding-right: 1rem; border-radius: 5px; text-align: center; min-height: 2rem; cursor: pointer; }', 'onclick="{onClick}"', function(opts) {

  this.onClick = function(event) {
    if (opts.eventname) {
      this.trigger(opts.eventname, event);
    }
  }.bind(this)

});

riot.tag2('infobox', '<yield></yield>', 'infobox { font-family: Helvetica; padding: 0.5rem; display: block; }', '', function(opts) {
});

riot.tag2('localetime', '<span ref="time"></span>', '', 'timestamp="{Date.now()}"', function(opts) {

  this.on("update", function() {
    moment.locale(this.opts.locale);
    var localtime = moment(this.opts.timestamp).format('llll');
    this.refs.time.innerHTML = localtime;
  });
});

riot.tag2('appheader', '<div> <backbutton if="{opts.navback}"></backbutton>{title || opts.title} </div>', 'appheader { font-family: Helvetica; display: flex; align-items: center; background: black; font-weight: bold; color: white; padding: 0.5rem; min-height: 2rem; } appheader .hidden { display:none; }', '', function(opts) {

  this.on('update_title', function(title) {
    this.title = title;
    this.update();
  })

});

riot.tag2('herounit', '<h1>{opts.title}</h1> <yield></yield>', 'herounit { display: block; font-family: Helvetica; color: #333333; padding: 3rem; } herounit h1 { margin: 1rem 0; margin-bottom: 0; font-size: 3rem; line-height: 1; letter-spacing: -1px; color: inherit; }', '', function(opts) {
});

riot.tag2('userinfobox', '<img ref="user_image" riot-src="{this.userdata.image || ⁗⁗}"> <span ref="user_name" class="username">{this.userdata.username || ⁗⁗}</span>', 'userinfobox { font-family: Helvetica; display: flex; align-items: center; padding: 0.5rem; } userinfobox .username { font-weight: bold; padding-left: 0.5rem; padding-right: 0.5rem; } userinfobox > img { border-radius: 5px; }', '', function(opts) {

  this.userdata = [];

  this.setUserData = function(userdata) {
    this.userdata = userdata;
    this.update();
  }.bind(this)

});

riot.tag2('login', '<herounit title="{this.appmodel.appname}"> <p> Welcome to {this.appmodel.appname} </p> <p> <actionbutton caption="Login via Twitter" href="/login/twitter"></actionbutton> </p> </herounit>', '', '', function(opts) {
});

riot.tag2('overview', '<appheader title="{this.appmodel.appname}"></appheader> <infobox>Your app description goes here...</infobox> <content> <userinfobox ref="userinfobox" userdata=""></userinfobox> <buttonbox> <actionbutton caption="Example Button" href="#nextPage"></actionbutton> </buttonbox> </content>', '', 'show="{visible}"', function(opts) {

  this.on("mount", function() {
    var self = this;
    this.appmodel.on("update_user", function(userData) {
      self.refs.userinfobox.setUserData(userData);
    });
    this.appmodel.fetchUserData();
  });

  this.setVisibility = function(value) {
    this.visible = value;
    this.update();
  }.bind(this)

});
