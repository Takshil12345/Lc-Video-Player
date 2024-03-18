console.log("HI");
console.log(window.location.href)

let showVidePage = false
let lastSet = "description"
let isDragging = false;

if (window.location.href.startsWith("https://leetcode.com/problems/")) {
    // Create the video column element
    setTimeout(async () => {
        const parent = document.getElementById('ide-top-btns').firstChild;
        console.log(parent)
        const newChild = document.createElement("button");
        newChild.id = "video-button"
        newChild.textContent = "Video"; // Set content
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

    }, 3000)

}

function make_display_none(arr) {
    arr.forEach((item) => {
        item.style.display = 'none'
    })
}


function display_search_result() {

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
            const data = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs&q=${problemName}&type=video`)

            const result = await data.json()

            for (let item of result.items) {
                // console.log(item.id.videoId)
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


                const videoDataResult = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&id=${item.id.videoId}&key=AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs`);
                const videoData = await videoDataResult.json();

                // console.log(videoData.items[0])
                const textDiv = document.createElement('div');
                textDiv.style.marginLeft = '20px'; // Adjust margin as needed
                //
                const p1 = document.createElement('p')
                p1.textContent = `${videoData.items[0].snippet.title}`
                // p1.style.fontSize = '1em'
                // p1.style.marginLeft = '30px'

                const p2 = document.createElement('p')
                p2.textContent = `View Count : ${videoData.items[0].statistics.viewCount}`

                const p3 = document.createElement('p')
                p3.textContent = `Like Count : ${videoData.items[0].statistics.likeCount}`

                textDiv.appendChild(p1);
                textDiv.appendChild(p2);
                textDiv.appendChild(p3);

                outsideDiv.appendChild(videoPlayer);
                outsideDiv.appendChild(textDiv);
                divElement.appendChild(outsideDiv);
            }

            header.appendChild(divElement);

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