<overview show={ visible }>
  <appheader title="Eat Sleep Rave Repeat"></appheader>
  <infobox>This app will change your life.</infobox>
  <content>
    <userinfobox ref="userinfobox" userdata=""></userinfobox>
    <buttonbox>
      <actionbutton caption="Example Button" href="#nextPage"></actionbutton>
    </buttonbox>
  </content>

  this.on("mount", function() {
    var self = this;
    this.appmodel.on("update_user", function(userData) {
      self.refs.userinfobox.setUserData(userData);
    });
    this.appmodel.fetchUserData();
  });

  setVisibility(value) {
    this.visible = value;
    this.update();
  }

</overview>
