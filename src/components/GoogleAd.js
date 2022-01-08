import React, { Component } from "react";

class GoogleAd extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div>
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8898673271651962"
          data-ad-slot="5978275945"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

export default GoogleAd;
