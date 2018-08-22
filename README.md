# Next-react-proxy

以下页面跳转路由都没问题，页面刷新会报错 connect ECONNREFUSED 127.0.0.1:80（express和koa2下面表现形式一样）

## 解决方法：

* 把请求获取数据的方法放在 async componentDidMount里，而不是static async getInitialProps里
* 在API前面加上http://localhost:3000/

## 注：
* 解决方法1用生命周期来解决，具体原因还在研究中；

* 解决方法2是因为，如果没有在请求页面加上域名和端口，则服务器对默认host：port的请求为127.0.0.1:80，此时在请求前面加上http://localhost:3000/ 就可以了