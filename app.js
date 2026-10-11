// Selektor DOM Utama
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskCourseInput = document.getElementById('task-course');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const activeCountSpan = document.getElementById('active-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// State Aplikasi
let tasks = [];
let currentFilter = 'all';

// Inisialisasi Aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    render();
});

// 1. Fitur Tambah Tugas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const course = taskCourseInput.value.trim();
    const deadline = taskDeadlineInput.value;

    if (title.length < 3) {
        alert('Judul tugas minimal harus 3 karakter.');
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        title: title,
        course: course,
        deadline: deadline,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    render();
    
    taskForm.reset();
});

// Event Delegation untuk interaksi dalam daftar tugas (Selesai & Hapus)
taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const taskId = taskItem.dataset.id;

    // 3. Fitur Selesai (Checkbox)
    if (e.target.classList.contains('task-checkbox')) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = e.target.checked;
            saveTasks();
            render();
        }
    }

    // 4. Fitur Hapus Tugas
    if (e.target.classList.contains('btn-delete')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        render();
    }
});

// 5. Fitur Filter
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// 9. Simpan Data Menggunakan localStorage
function saveTasks() {
    localStorage.setItem('kuliah_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('kuliah_tasks');
    if (storedTasks) {
        try {
            tasks = JSON.parse(storedTasks);
        } catch (error) {
            tasks = [];
        }
    }
}

// 7. Satu Fungsi render() Utama untuk Memperbarui Tampilan
function render() {
    // Filter tugas berdasarkan status aktif
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    // Kosongkan kontainer list
    taskList.innerHTML = '';

    // Tampilkan pesan kosong jika tidak ada tugas
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Render setiap item tugas menggunakan textContent (11. Mencegah XSS)
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        // Kontainer Info
        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';

        // Checkbox Selesai
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;

        // Detail Teks Tugas
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const h3 = document.createElement('h3');
        h3.textContent = task.title; // Menggunakan textContent agar aman dari injeksi HTML

        const taskMeta = document.createElement('div');
        taskMeta.className = 'task-meta';

        const courseTag = document.createElement('span');
        courseTag.className = 'course-tag';
        courseTag.textContent = task.course;

        const deadlineSpan = document.createElement('span');
        deadlineSpan.textContent = `Deadline: ${task.deadline}`;

        taskMeta.appendChild(courseTag);
        taskMeta.appendChild(deadlineSpan);

        taskDetails.appendChild(h3);
        taskDetails.appendChild(taskMeta);

        taskInfo.appendChild(checkbox);
        taskInfo.appendChild(taskDetails);

        // Tombol Hapus
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Hapus';

        li.appendChild(taskInfo);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // 6. Tampilkan Jumlah Tugas yang Masih Aktif
    const activeTasksCount = tasks.filter(t => !t.completed).length;
    activeCountSpan.textContent = activeTasksCount;
}