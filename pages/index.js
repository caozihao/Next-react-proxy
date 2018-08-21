import React from 'react'
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { response: '' }
  }

  static async getInitialProps({ pathname, query }) {
    return {
      pathname,
      query,
      queryString: Object.keys(query).join('')
    }
  }

  async componentDidMount() {
    // const { data } = await axios.get('/api/');
    // console.log('data ->', data);

    const fetchLoanInfoConfig = {
      method: 'GET',
      url: '/lendApi/loan/fetch_loan_info',
      headers: {
        'Access-Token': '5442b388b1f946e1a6fd7d965e1a2045',
        'Account-Code': '405449472743571456',
        'Client-Id': '803',
        'Client-Version': '2.0.0',
        'Country': 'CN',
        'Language': 'zh-CN',
        'Timestamp': 1534864736570,
        'User-Code': 405449472743571456
      }
    }

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
    this.setState({ response: JSON.stringify(data) })
  }

  render() {
    return (
      <content>
        <p>
          /api/{this.props.queryString} routed to https://swapi.co/api/{this.props.queryString}
        </p>
        <p>
          <a href='?people/2'>Try</a>
          &nbsp;
          <a href='/'>Reset</a>
        </p>
        <pre>
          {this.state.response ? this.state.response : 'Loading...'}
        </pre>
      </content>
    )
  }
}
