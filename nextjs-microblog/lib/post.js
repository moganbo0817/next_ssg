import path from "path";
import fs from "fs";
import matter from "gray-matter";

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