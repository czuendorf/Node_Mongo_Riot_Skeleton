<appheader>
  <div><backbutton if={opts.navback}></backbutton>{title || opts.title}</div>

  this.on('update_title', function(title) {
    this.title = title;
    this.update();
  })

  <style>
    appheader {
      font-family: Helvetica;
      display: flex;
      align-items: center;
      background: black;
      font-weight: bold;
      color: white;
      padding: 0.5rem;
      min-height: 2rem;
    }

    appheader .hidden {
      display:none;
    }
  </style>
</appheader>
