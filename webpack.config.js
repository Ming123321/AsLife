//1.配置打包入口
//2.配置打包出口
//这个文件，用的是nodejs的语法
//需要使用nodejs提供的方法来读取当前目录的绝对路径
const path = require('path');

//引入vue-loader15所依赖的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',
    },
    devtool:'inline-source-map',//解决SourceMap警告
    module:{//专门用于配置所有的第三方模块的 loader 加载器
        rules:[//设置第三方加载器匹配规则
            {test: /\.css$/, use:['style-loader','css-loader']},
            {test: /\.less$/, use:['style-loader','css-loader','less-loader']},
            {test: /\.(jpg|jpeg|png|gif|bmp)$/, 
                 use:[{
                    loader:'url-loader',
                    options:{esModule:false}}
                ]
            },
            {test: /\.(otf|eot|svg|ttf|woff|woff2)$/, use:['url-loader']},
            {test: /\.js$/, use:'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use:'vue-loader'},
            //{test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=9000&name=[hash:8]-[name].[ext]'},
        ]
    },
    plugins:[
        new VueLoaderPlugin() //配置插件节点
    ],
    mode:'production',
    performance:{
        hints:'warning',
        maxAssetSize:6000000,//单位 字节 默认250kb
        maxEntrypointSize:6000000
    }
}