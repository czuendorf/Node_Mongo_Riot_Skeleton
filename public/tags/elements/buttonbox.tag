<buttonbox>
  <yield/>

  <style>
    buttonbox {
      display: flex;
      padding: 0.5rem;
    }

    buttonbox actionbutton {
      flex: 1;
    }

    buttonbox actionbutton + actionbutton {
      margin-left: 0.5rem;
    }
  </style>
</buttonbox>
