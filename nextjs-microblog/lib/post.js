import path from "path";
import fs from "fs";
import matter from "gray-matter";
import exp from "constants";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータをとりだす
export function getPostsData() {
    // conar featchData = await fetch("endpoint");
    const  fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName)=>{
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,"utf8");

        const matterResult = matter(fileContents);
        
        return {
            id,
            ...matterResult.data,
        };

    });
    return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostsIds() {
    const  fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            }
        };
    });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory,`${id}.md`);
    const fileContents = fs.readFileSync(fullPath,"utf8")

    const matterResult = matter(fileContents);

    const blogContent =await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}