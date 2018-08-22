import React, { Component } from 'react'
import axios from 'axios';

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { response: '' }
  }

  static async getInitialProps({ pathname, query }) {
    //如果是Koa，则需要在url前面加上域名和端口号 
    const loginInConfig = {
      method: 'POST',
      url: '/lendApi/account/login',
      headers: {
        'Client-Id': '803',
        'Client-Version': '2.0.0',
        'Country': 'CN',
        'Language': 'zh-CN',
        'Timestamp': 1534864736570,
        'User-Code': 405449472743571456
      },
      data: {
        account: "13564410428",
        password: "2B966AF4E17D5193B69E76855EC74AEA"
      }
    }

    const querySlotByCodeConfig = {
      method: 'GET',
      url: '/monkeyApi/ad/slot/query_slot_by_code?adSlotCode=mo9.libra.news',
      headers: {
        'Client-Id': 503,
      }
    }

    const { data } = await axios(loginInConfig)
    return { data: JSON.stringify(data) };
  }

  componentDidMount() {

  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <pre>
          {data ? data : 'Loading...'}
        </pre>
      </div>
    )
  }
}

export default Page;