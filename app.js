const btnSubmit = document.getElementById('submit');
const inputName = document.getElementById('name');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');

const btnList = document.getElementById('btnList');
const db = new PouchDB('personas');


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(function(registration){
        console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(err => console.log('Error al tratar de registrar el SW', err));
}


btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const persona = {
        _id: new Date().toISOString(),
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value,
        status: 'pending'
    };

    db.put(persona)
        .then((response) => {
            console.log(response);
            console.log('Persona guardada con éxito');
            inputName.value = '';
            inputAge.value = '';
            inputEmail.value = '';
            updateList();
        }).catch(err => {
            console.error('Error al guardar la persona', err);
        });
});

function updateList() {
    const listadoDiv = document.querySelector('#listado');
    listadoDiv.innerHTML = '';

    db.allDocs({ include_docs: true }).then(result => {
        if (result.rows.length === 0) {
            listadoDiv.innerHTML = '<p class="text-center text-muted">No hay registros aún.</p>';
            return;
        }

        result.rows.forEach(row => {
            const persona = row.doc;

            const card = document.createElement('div');
            card.className = 'card mb-3 shadow-sm';
            card.innerHTML = `
                <div class="card-body">
                <h5 class="card-title mb-2">${persona.name}</h5>
                <p class="card-text mb-1"><strong>Edad:</strong> ${persona.age}</p>
                <p class="card-text mb-0"><strong>Email:</strong> ${persona.email}</p>
                <button class="btn btn-sm btn-outline-danger mt-3">Eliminar</button>
                </div>
            `;

            const btn = card.querySelector('button');
            btn.addEventListener('click', () => deleteUser(persona));

            listadoDiv.appendChild(card);
        });

    });
}

deleteUser = (persona) => {
    db.remove(persona)
        .then((result) => {
            console.log('Persona eliminada', result);
            updateList();
        }
        ).catch((err) => {
            console.error('Error al eliminar la persona', err);
        })
};

updateList();
