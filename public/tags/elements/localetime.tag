<localetime timestamp={ Date.now() }>
  <span ref="time"></span>

  this.on("update", function() {
    moment.locale(this.opts.locale);
    var localtime = moment(this.opts.timestamp).format('llll');
    this.refs.time.innerHTML = localtime;
  });
</localetime>
