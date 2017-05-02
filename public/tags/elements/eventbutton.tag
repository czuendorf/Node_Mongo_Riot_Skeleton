<eventbutton onclick="{ onClick }">
  <span>{ opts.caption }</span>

  onClick(event) {
    if (opts.eventname) {
      this.trigger(opts.eventname, event);
    }
  }

  <style>
    eventbutton {
      display: inline-flex;
      user-select: none;
      align-items: center;
      font-family: Helvetica;
      background: grey;
      color: white;
      padding-left: 1rem;
      padding-right: 1rem;
      border-radius: 5px;
      text-align: center;
      min-height: 2rem;
      cursor: pointer;
    }
  </style>

</eventbutton>
