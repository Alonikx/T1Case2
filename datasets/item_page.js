let scriptEnabled = false;
function fixed_block() {
    console.log(scriptEnabled);
    scriptEnabled = !scriptEnabled;
    if (scriptEnabled) {
        const content_item = document.querySelector('.content_item');

        content_item.addEventListener('mousedown', (e) => {
            const rect = content_item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveHandler = (e) => {
                const newX = e.clientX - x;
                const newY = e.clientY - y;
                content_item.style.top = `${newY}px`;
                content_item.style.left = `${newX}px`;
            };

            const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });
        const content_diagramm = document.querySelector('.content_diagramm');

        content_diagramm.addEventListener('mousedown', (e) => {
            const rect = content_diagramm.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveHandler = (e) => {
                const newX = e.clientX - x;
                const newY = e.clientY - y;
                content_diagramm.style.top = `${newY}px`;
                content_diagramm.style.left = `${newX}px`;
            };

            const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });
        const resizeHandles = document.querySelector('.rigth-handle');
        let isResizings = false;
        let startXs = 0;
        let startYs = 0;
        let startWidths = 0;
        let startHeights = 0;

        resizeHandles.addEventListener('mousedown', (e) => {
            isResizings = true;
            startXs = e.clientX;
            startYs = e.clientY;
            startWidths = content_diagramm.offsetWidth;
            startHeights = content_diagramm.offsetHeight;
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizings) {
                const newWidth = startWidths + (e.clientX - startXs);
                const newHeight = startHeights + (startYs - e.clientY);
                content_diagramm.style.width = `${newWidth}px`;
                content_diagramm.style.height = `${newHeight}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isResizings = false;
        });

        const content = document.querySelector('.content');

        content.addEventListener('mousedown', (e) => {
            const rect = content.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveHandler = (e) => {
                const newX = e.clientX - x;
                const newY = e.clientY - y;
                content.style.top = `${newY}px`;
                content.style.left = `${newX}px`;
            };

            const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });
        const resizeHandle = document.querySelector('.left-handle');
        let isResizing = false;
        let startX = 0;
        let startY = 0;
        let startWidth = 0;
        let startHeight = 0;

        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = content.offsetWidth;
            startHeight = content.offsetHeight;
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const newWidth = startWidth + (startX - e.clientX);
                const newHeight = startHeight + (startY - e.clientY);
                content.style.width = `${newWidth}px`;
                content.style.height = `${newHeight}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    } else {
        const content_item = document.querySelector('.content_item');
        content_item.removeEventListener('mousedown', () => { });

        const content_diagramm = document.querySelector('.content_diagramm');
        content_diagramm.removeEventListener('mousedown', () => { });

        const resizeHandles = document.querySelector('.rigth-handle');
        resizeHandles.removeEventListener('mousedown', () => { });

        const content = document.querySelector('.content');
        content.removeEventListener('mousedown', () => { });

        const resizeHandle = document.querySelector('.left-handle');
        resizeHandle.removeEventListener('mousedown', () => { });

        document.removeEventListener('mousemove', () => { });
        document.removeEventListener('mouseup', () => { });
    }
}
