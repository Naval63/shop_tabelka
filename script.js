class TestForm {
    get isFormValid() {
        return this.form.checkValidity();
    }
    constructor() {
        this.form = document.querySelector('#example-form');
        this.inputOne = document.querySelector('#input_one');
        this.inputOne.addEventListener('input', this.inputHandler.bind(this));
        this.inputTwo = document.querySelector('#input_two');
        this.inputTwo.addEventListener('input', this.inputHandler.bind(this));
        this.sendMeButton = document.querySelector('#send-me');
        this.sendMeButton.addEventListener('click', this.formSubmit.bind(this));
        this.url = 'http://localhost:3000/db/shop_name/?info:id';
        this.table = document.querySelector('#user-table > tbody');
    }
    inputHandler() {
        this.sendMeButton.disabled = !this.isFormValid;
    }
    async formSubmit() {
        const url = await this.getData();
        this.clearTableBody();
        url.forEach((userData) => {
            const row = this.createRow(userData);
            this.table.appendChild(row);
        });
    }

    getData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(this.url, {headers, method: 'GET'}).then(response => response.json())
    };

    createCell(value) {
        const td = document.createElement('td');
        td.innerText = value;
        return td;
    }

    clearTableBody() {
        // Array.from(this.table.querySelectorAll('tr')).forEach(row => row.remove());
        this.table.innerHTML = '';
    }

    createRow(userData) {
        const tr = document.createElement('tr');
        ['count', 'name'].forEach(key => {
            tr.appendChild(this.createCell(userData[key]));
        });
        return tr;
    }
}
const testForm = new TestForm();