import React, { Component } from 'react';
import axios from 'axios';


// 第一种方式 用Promise
const getData = (type) => {
  let data = "";
  let res = "";
  const P = new Promise((resolve, reject) => {
    if (type === "extranet") {
      axios.get('https://api.github.com/repos/zeit/next.js').then((result) => {
        // console.log('data1 ->',result.data.stargazers_count);
        resolve(result.data.stargazers_count);
      })
    }
  })
  return P;
}

// 第二种方式 用async
const getData2 = async (type) => {
  let res = "";
  let result = "";
  if (type === "getRequest") {
    const { data } = await axios.get('https://api.github.com/repos/zeit/next.js');
    // console.log('getRequest ->',data);
    return data.stargazers_count;
  } else if (type === 'postRequest') {
    const { data } = await axios.post('https://httpbin.org/post');
    // console.log('postRequest ->',data);
    return data.origin;
  } else if (type === 'libraPostRequest') {

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

    // 接口前面加了 http://localhost:3000  就没问题
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
    const { data } = await axios(loginInConfig)
    return data.data.verifyNeed.mobile;
  }


}

class Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }

  static async getInitialProps({ req }) {

    let getRequestData = '';
    let postRequestData = '';
    let libraPostRequestData = '';
    let environment = '';
    if (req) {
      environment = '服务端';
    } else {
      environment = '客户端';
    }
    getRequestData = await getData2('getRequest');
    postRequestData = await getData2('postRequest');
    libraPostRequestData = await getData2('libraPostRequest');
    return { getRequestData, postRequestData, libraPostRequestData, environment };
  }


  addNumber = () => {
    this.setState((preState) => {
      // console.log('preState ->',preState);
      return {
        number: preState.number + 1
      }
    })
  }

  render() {
    const { getRequestData, postRequestData, libraPostRequestData, environment } = this.props;
    const { number } = this.state;
    return (
      <div>
        <p>{environment}</p>
        <p> getRequestData ：{getRequestData}</p>
        <p> postRequestData ：{postRequestData}</p>
        <p> libraPostRequestData ：{libraPostRequestData}</p>
        <p> Number:{number}</p>
        <p> <button onClick={this.addNumber}>点我加1</button></p>
      </div>
    )
  }
}

export default Page;
