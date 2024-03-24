// console.log("HI");
// console.log(window.location.href)

let showVidePage = false
let lastSet = "description"
let isDragging = false;


refresh();

function refresh() {
    if (window.location.href.startsWith("https://leetcode.com/problems/")) {
        // Create the video column element
        setTimeout(async () => {
            const parent = document.getElementById('ide-top-btns').firstChild;
            console.log(parent)

            const newChild = document.createElement("button");
            newChild.id = "video-button"
            // newChild.textContent = "Video"; // Set content
            const img = document.createElement("img");
            img.src = chrome.runtime.getURL("icon.svg"); // Replace "path/to/your/svg/file.svg" with the actual path to your SVG file
            img.style.width = "32px"; // Adjust the width as needed
            img.style.height = "32px"; // Adjust the height as needed
            img.style.marginLeft = '5px'
            // Append the img element to the button
            newChild.appendChild(img);

            newChild.addEventListener('click', display);
            parent.appendChild(newChild);


            const splitter = document.getElementsByClassName('flexlayout__splitter flexlayout__splitter_vert')[0];
            splitter.addEventListener('mousedown', (event) => {
                isDragging = true;
                console.log("Dragging started")

            });

            document.addEventListener('mousemove', (event) => {
                if (isDragging && showVidePage) {
                    console.log("width is changing")
                    console.log(splitter.style.left)
                    // document.getElementsByClassName('flexlayout__splitter flexlayout__splitter_vert')[0];
                    const divToChange = document.getElementById('sendanamakwalichut');
                    if (showVidePage) divToChange.style.setProperty('--width', `${splitter.style.left}`);

                }
            });

            document.addEventListener('mouseup', () => {
                console.log("Dragging finished")
                // console.log(document.getElementsByClassName('flexlayout__splitter flexlayout__splitter_vert')[0]);
                isDragging = false;
            });

            // add event listner to all 3 of those items and check if id present then delete it and add .
            let urlChaangeArr = []
            const item1 = document.getElementsByClassName("flex items-center")[0];
            console.log(item1);
            urlChaangeArr.push(item1);

            urlChaangeArr.forEach((item) => {
                item.addEventListener('click', async () => {
                    const elementToRemove = document.getElementById('sendanamakwalichut');
                    if (elementToRemove) {
                        if (!showVidePage) {
                            elementToRemove.remove();
                        } else {
                            await display();
                            elementToRemove.remove();

                        }
                    }
                })
            })
        }, 3000)

    }
}

function make_display_none(arr) {
    arr.forEach((item) => {
        item.style.display = 'none'
    })
}


function display_search_result() {

}

async function display_video_solutions(description) {
    const header = document.getElementsByClassName('flexlayout__layout')[0]
    // console.log(header)
    // Create a new div element
    const divElement = document.createElement('div');

    divElement.className = 'flexlayout__tab';
    divElement.setAttribute('data-layout-path', '/video');
    divElement.id = 'sendanamakwalichut';
    divElement.style.left = '0px';
    divElement.style.top = '36px';
    divElement.style.position = 'absolute';
    divElement.style.setProperty('--width', `${description.style.getPropertyValue('--width')}`);
    divElement.style.setProperty('--height', '820px');

    const h1 = document.createElement("H1");
    h1.textContent = "Video Solutions";
    h1.style.fontSize = "3em";
    h1.style.marginBottom = '40px'
    h1.style.marginLeft = '20px'
    divElement.appendChild(h1)

    const url = window.location.href
    const problemName = url.split('/')[4]
    const data = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs&q=${problemName}+leetcode&type=video`)

    const result = await data.json()

    for (let item of result.items) {
        console.log(item.id.videoId)
        const outsideDiv = document.createElement('div');
        outsideDiv.id = `${item.id.videoId}`;
        outsideDiv.style.marginBottom = '20px';
        outsideDiv.style.marginLeft = '20px';
        outsideDiv.style.display = 'flex'; // Make the outer div a flex container

        const videoPlayer = document.createElement('iframe');
        videoPlayer.width = '400px';
        videoPlayer.height = '300px';
        videoPlayer.style.flex = '0 0 auto'; // Make the video player element non-flexible
        videoPlayer.src = `https://www.youtube.com/embed/${item.id.videoId}`;


        const videoDataResult = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&part=contentDetails&id=${item.id.videoId}&key=AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs`);
        const videoData = await videoDataResult.json();

        // console.log(videoData.items[0])
        const textDiv = document.createElement('div');
        textDiv.style.marginLeft = '20px'; // Adjust margin as needed
        textDiv.style.marginTop = '80px'
        //
        const p1 = document.createElement('p')
        const div1 = document.createElement('div')
        div1.style.display = 'flex';

        const calendar = document.createElement('img');
        calendar.style.marginRight = '5px';
        calendar.style.width = '20px';
        calendar.style.height = '20px';
        calendar.src = chrome.runtime.getURL("calendar.svg"); // Replace 'path/to/your/image.png' with the actual path to your image

        const dateString = videoData.items[0].snippet.publishedAt;
        const date = new Date(dateString);
        const currentDate = new Date();

        const years = currentDate.getFullYear() - date.getFullYear();
        const months = (currentDate.getMonth() - date.getMonth() + 12) % 12;
        // console.log(years)
        // console.log(months)

        let timeAgo = ""
        if (years) timeAgo = `${years} years ago`
        else timeAgo = `${months} months ago`

        div1.appendChild(calendar)
        p1.textContent = `${timeAgo}`
        div1.appendChild(p1)
        // p1.style.fontSize = '1em'
        // p1.style.marginLeft = '30px'

        const div2 = document.createElement('div')
        div2.style.display = 'flex';

        const p2 = document.createElement('p')
        const clock = document.createElement('img');
        clock.style.marginRight = '5px';
        clock.style.width = '20px';
        clock.style.height = '20px';
        clock.src = chrome.runtime.getURL("clock.svg"); // Replace 'path/to/your/image.png' with the actual path to your image

        div2.appendChild(clock);

        const timeString = `${videoData.items[0].contentDetails.duration}`
        const matches = timeString.match(/PT(\d+)M(?:(\d+)S)?/);
        console.log(matches)
        const minutes = parseInt(matches[1]);
        // if(matches.length>=3)const seconds = parseInt(matches[2]);
        p2.textContent = `${minutes} mins `

        div2.appendChild(p2)

        const div3 = document.createElement('div')
        div3.style.display = 'flex';

        const p3 = document.createElement('p')
        const views = document.createElement('img');
        views.style.marginRight = '5px';
        views.style.width = '20px';
        views.style.height = '20px';
        views.src = chrome.runtime.getURL("eye.svg"); // Replace 'path/to/your/image.png' with the actual path to your image

        div3.appendChild(views);
        p3.textContent = ` ${videoData.items[0].statistics.viewCount} views`
        div3.appendChild(p3)

        const div4 = document.createElement('div')
        div4.style.display = 'flex';
        const like = document.createElement('img');
        like.style.marginRight = '5px';
        like.style.width = '20px';
        like.style.height = '20px';
        like.src = chrome.runtime.getURL("like.svg"); // Replace 'path/to/your/image.png' with the actual path to your image

        const p4 = document.createElement('p')

        div4.appendChild(like)
        p4.textContent = `${videoData.items[0].statistics.likeCount}`
        div4.appendChild(p4)

        const div5 = document.createElement('div')
        div5.style.display = 'flex';

        const channel = document.createElement('img');
        channel.style.marginRight = '5px';
        channel.style.width = '20px';
        channel.style.height = '20px';
        channel.src = chrome.runtime.getURL("icon.svg"); // Replace 'path/to/your/image.png' with the actual path to your image

        div5.appendChild(channel)
        const p5 = document.createElement('p')
        p5.textContent = `${videoData.items[0].snippet.channelTitle}`
        div5.appendChild(p5)

        const div6 = document.createElement('div')
        div6.style.display = 'flex';
        div6.style.marginTop = '6px'

        const link = document.createElement('a');
        link.setAttribute('href', `https://www.youtube.com/watch?v=${item.id.videoId}`);
        link.setAttribute('target', '_blank'); // Opens link in a new tab
        link.textContent = 'Watch on Youtube';

        div6.appendChild(link)

        textDiv.appendChild(div1);
        textDiv.appendChild(div2);
        textDiv.appendChild(div3);
        textDiv.appendChild(div4);
        textDiv.appendChild(div5);
        textDiv.appendChild(div6);

        outsideDiv.appendChild(videoPlayer);
        outsideDiv.appendChild(textDiv);
        divElement.appendChild(outsideDiv);
    }

    header.appendChild(divElement);
}


async function display() {

    showVidePage = !showVidePage
    console.log(showVidePage)

    if (showVidePage) {
        // Get the element with class "flexlayout__tab" and data-layout-path="/ts0/t0"
        const description = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t0"]');
        const editorial = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t1"]');
        const solution = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t2"]');
        const submission = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t3"]');
        const tabBar = document.getElementsByClassName('flexlayout__tabset_tabbar_inner flexlayout__tabset_tabbar_inner_top')[0]

        const arr = []
        arr.push(description, editorial, solution, submission, tabBar)
        for (let i = 0; i < 4; i++) {
            // console.log(arr[i].style.display)
            if (arr[i].style.display !== 'none') {
                if (i === 0) lastSet = 'description'
                else if (i === 1) lastSet = 'editorial'
                else if (i === 2) lastSet = 'solution'
                else lastSet = 'submission'
                // console.log(i + "," + lastSet)
                break
            }
        }
        // console.log(lastSet)
        make_display_none(arr)

        // console.log("HELLO")
        console.log(description.style.getPropertyValue('--width'));
        const alreadyPresent = document.getElementById('sendanamakwalichut')

        if (alreadyPresent) {
            alreadyPresent.style.setProperty('--width', `${description.style.getPropertyValue('--width')}`);
            alreadyPresent.style.display = ''
        } else {
            await display_video_solutions(description);
        }


    } else {
        // console.log(lastSet)
        let currentItem;
        if (lastSet === 'description') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t0"]');
        else if (lastSet === 'editorial') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t1"]');
        else if (lastSet === 'solution') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t2"]');
        else currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t3"]');

        const tabBar = document.getElementsByClassName('flexlayout__tabset_tabbar_inner flexlayout__tabset_tabbar_inner_top')[0]
        const insertedVidePage = document.getElementById('sendanamakwalichut')

        // console.log(currentItem)
        insertedVidePage.style.display = 'none'
        currentItem.style.display = ''
        tabBar.style.display = ''
    }
}

// <div class="flexlayout__tab" data-layout-path="/ts0/t0" id="a9522ade-33ca-4b15-8c6e-9d9748ac2c65" style="left: 0px; top: 36px; position: absolute; --width: 655px; --height: 820px;"

// AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs