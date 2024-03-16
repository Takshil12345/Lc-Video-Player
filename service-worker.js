// console.log("HI");
// console.log(window.location.href)
//
// if (window.location.href.startsWith("https://leetcode.com/problems/")) {
//     // Create the video column element
//     setTimeout(async () => {
//         const result = document.getElementsByClassName("flexlayout__tabset_tabbar_inner_tab_container flexlayout__tabset_tabbar_inner_tab_container_top")[0];
//         // console.log(result)
//         console.log("HELLO");
//         // 1. Create a new div element
//         const newDiv = document.createElement("div");
//         newDiv.id = "video-button"
//         newDiv.textContent = "Video"; // Set content
//         newDiv.style.backgroundColor = "lightgreen"; // Set style (optional)
//         newDiv.addEventListener('click', async () => {
//             const page_data = await document.getElementsByClassName('flex flex-none cursor-pointer p-2 text-gray-60 dark:text-gray-60');
//             console.log(page_data)
//         });
//
//         result.appendChild(newDiv);
//
//
//         const button = document.getElementById('video-button');
//         button.click()
//     }, 3000)
//
// }
//
// async function display() {
//     const page_data = document.getElementsByClassName('flex h-full w-full flex-col')[1];
//     // while (page_data.firstChild) {
//     //     page_data.removeChild(page_data.firstChild)
//     // }
//     console.log(page_data)
// }