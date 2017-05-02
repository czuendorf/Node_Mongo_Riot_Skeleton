<userinfobox>
  <img ref="user_image" src={this.userdata.image || ""}/>
  <span ref="user_name" class="username">{this.userdata.username || ""}</span>

  this.userdata = [];

  setUserData(userdata) {
    this.userdata = userdata;
    this.update();
  }

  <style>
    userinfobox {
      font-family: Helvetica;
      display: flex;
      align-items: center;
      padding: 0.5rem;
    }

    userinfobox .username {
      font-weight: bold;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    userinfobox img {
      border-radius: 5px;
    }
  </style>

</userinfobox>
