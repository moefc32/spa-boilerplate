'use strict';

const routes = {
    '/': './view/a.html',
    404: './view/404.html',
    'b': './view/b.html',
    'c': './view/c.html',
};

document.addEventListener('alpine:init', () => {
    Alpine.data('init', () => ({
        async openLocation(path) {
            const route = path ? routes[path] || routes[404] : routes['/'];
            const html = await fetch(route).then((data) => {
                if (data.ok) {
                    return data.text();
                }
            }) || await fetch(routes[404]).then((asdf) => {
                return asdf.text();
            });
            document.querySelector('#main-content').innerHTML = html;
            Alpine.store('currentPath', path ?? '/');
            path != '/' ? localStorage.setItem('currentPath', path) : localStorage.removeItem('currentPath');
        },

        init() {
            this.openLocation(localStorage.getItem('currentPath') ?? '/');
        },
    }));

    Alpine.store('currentPath', localStorage.getItem('currentPath') ?? '/');
});
