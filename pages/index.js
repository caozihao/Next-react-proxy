import React from 'react'
import Link from 'next/link'

class GetData extends React.Component {
  static getInitialProps({ req }) {
    return {};
  }

  /*
  以下页面跳转路由都没问题，页面刷新会报错 connect ECONNREFUSED 127.0.0.1:80（express和koa2下面表现形式一样）
  解决方法：
  1，把请求获取数据的方法放在 async componentDidMount里，而不是static async getInitialProps里
  2，在API前面加上http://localhost:3000/

  注：
  1，解决方法1用生命周期来解决，具体原因还在研究中；
  2，解决方法2是因为，如果没有在请求页面加上域名和端口，则服务器对默认host：port的请求为127.0.0.1:80，此时在请求前面加上http://localhost:3000/ 就可以了
  */

  render() {
    const { } = this.props
    return (
      <div>
        <div>
          <p><Link href='/main'><a><b>main</b></a></Link></p>
          <p><Link href='/GetData'><a><b>GetData</b></a></Link>（请求数据：getInitialProps，端口和域名：无,刷新报错：是）</p>
          <p><Link href='/GetData2'><a><b>GetData2</b></a></Link>（请求数据：componentDidMount，端口和域名：无,刷新报错：否）</p>
          <p><Link href='/GetData3'><a><b>GetData3</b></a></Link> （请求数据：getInitialProps里，端口和域名：有,刷新报错：否）</p>
        </div>
      </div>
    )
  }
}

export default GetData