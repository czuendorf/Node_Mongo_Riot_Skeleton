<backbutton onclick="{ onClickBack }">
  <span>Back</span>

  onClickBack() {
    window.history.back();
  }

  <style>
    backbutton {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      user-select: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
      background: grey;
      color: white;
      border-radius: 5px;
      min-height: 2rem;
      text-align: center;
      cursor: pointer;
    }
  </style>

</backbutton>
