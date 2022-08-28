///  声明文件，就是给ts代码进行类型标注（这里的模块的声明文件，还有全局的声明文件 .vue是官方提供的）

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
    declare module 'mapbox-gl';
}

declare module 'theme-change';
declare module 'aplayer';
declare module 'marked';
declare module 'axios';
