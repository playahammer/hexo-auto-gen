# hexo-auto-gen
Although there are some apis in Hexo can be used to invoke generation or listeners triggered during the whole process, I still want to 
build a tool using the native Nodejs apis by own mind. if the files in your set tagert path is changed not including the file or directory created, operation in generating files would executes automatically.

## Usage
Just clone down or download this repository, copy the ```auto-gen.js``` to root directory of your blog. Execute the following command lines.
```shell
node[js] auto-gen.js [your source path]
```
The default soure path I set is relative `./source`.

## TODO
- [ ] Compare the change of html after generated, and refesh the page partially.
- [ ] Others.

## License.
MIT License
