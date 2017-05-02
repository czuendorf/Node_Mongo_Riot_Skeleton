<actionbutton onclick="{ onClick }">
  <span>{ opts.caption }</span>

  onClick() {
    if (opts.href) {
      location.href = opts.href;
    }
  }

  <style>
    actionbutton {
      display: inline-flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      font-family: Helvetica;
      font-weight: bold;
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

</actionbutton>
