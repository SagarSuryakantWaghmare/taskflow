import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  Archive,
  Calendar,
  Tag,
  Filter,
  Grid,
  List,
  Menu,
  X,
  User,
  Bell,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Home,
  Folder,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import api from "@/lib/api"

const Dashboard = () => {
  // Get the profile information
  const [user, setUser] = useState(null);
  const getUser = localStorage.getItem('token');
  useEffect(() => {
    if (getUser) {
      api.get('/auth/profile', { headers: { Authorization: `Bearer ${getUser}` } })
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, []);
  const userId = user?._id;

  // Everything for the token and apiconfig for every api
  const token = localStorage.getItem('token');
  const apiConfig = { headers: { Authorization: `Bearer ${token}` } };

  // State management
  const [loadingTasks, setLoadingTasks] = useState(false);
  
  // Get all the tasks from backend
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    if (!userId) return; 

    setLoadingTasks(true);
    api.get('/todos', {
      ...apiConfig,
      params: { userId }
    })
      .then(res => {
        let todos = [];
        if (res.data && res.data.data && Array.isArray(res.data.data.todos)) {
          todos = res.data.data.todos.map(todo => ({
            ...todo,
            id: todo._id || todo.id
          }));
        }
        setTasks(todos);
      })
      .catch(err => {
        console.log('Error fetching tasks', err);
        const msg = err?.response?.data?.message || 'Error fetching tasks';
        showNotification(msg, 'error');
      })
      .finally(() => setLoadingTasks(false));
  }, [token, userId]);

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  // Fetch categories from backend
  useEffect(() => {
    if (!token) return;
    api.get('/categories', apiConfig)
      .then(res => {
        if (res.data && res.data.data && Array.isArray(res.data.data.categories)) {
          // Add count property for UI
          const cats = res.data.data.categories.map(cat => ({
            ...cat,
            id: cat._id || cat.id,
            count: tasks.filter(task => task.category === cat.name && !task.archived).length
          }));
          setCategories(cats);
        }
      })
      .catch(() => {
        showNotification('Error fetching categories', 'error');
      });
    // eslint-disable-next-line
  }, [token]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    color: 'bg-blue-500'
  });

  // Update category counts when tasks change
  useEffect(() => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: tasks.filter(task => task.category === cat.name && !task.archived).length
    })));
  }, [tasks]);

  // Notification system
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Modal handlers
  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium',
        category: task.category || ''
      });
    } else {
      setEditingTask(null);
      setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
    }
    setShowTaskModal(true);
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ name: category.name, color: category.color });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', color: 'bg-blue-500' });
    }
    setShowCategoryModal(true);
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'all') return !task.archived;
    if (filterBy === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return !task.archived && task.dueDate && task.dueDate.split('T')[0] === today;
    }
    if (filterBy === 'upcoming') {
      const today = new Date();
      return !task.archived && task.dueDate && new Date(task.dueDate) > today;
    }
    if (filterBy === 'completed') return task.completed && !task.archived;
    if (filterBy === 'archived') return task.archived;
    return !task.archived && task.category === filterBy;
  });

  // Task operations
  const addTask = () => {
    if (!taskForm.title.trim()) {
      showNotification('Please enter a task title', 'error');
      return;
    }
    if (!taskForm.description || taskForm.description.trim().length < 10) {
      showNotification('Description must be at least 10 characters', 'error');
      return;
    }

    const newTask = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: taskForm.dueDate || undefined,
      priority: taskForm.priority || 'medium',
      category: taskForm.category || 'general',
    };

    api.post('/todos', newTask, apiConfig)
      .then(res => {
        setTasks(prev => [...prev, res.data.data.todo]);
        setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
        setShowTaskModal(false);
        showNotification('Task added successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error adding task';
        console.error('Error adding task:', err);
        showNotification(msg, 'error');
      });
  };

  const updateTask = () => {
    if (!editingTask) return;
    api.put(`/todos/${editingTask.id}`, taskForm, apiConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        setEditingTask(null);
        setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
        setShowTaskModal(false);
        showNotification('Task updated successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error updating task';
        showNotification(msg, 'error');
      });
  };

  const toggleTaskComplete = (taskId) => {
    api.patch(`/todos/${taskId}/toggle`, {}, apiConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        showNotification(`Task ${updatedTask.completed ? 'completed' : 'marked as incomplete'}!`);
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error toggling task';
        showNotification(msg, 'error');
      });
  };

  const deleteTask = (taskId) => {
    api.delete(`/todos/${taskId}`, apiConfig)
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        showNotification('Task deleted successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error deleting task';
        showNotification(msg, 'error');
      });
  };

  // Archive task functionality (currently unused but available for future use)
  const archiveTask = (taskId) => {
    api.patch(`/todos/${taskId}`, { archived: true }, apiConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        showNotification('Task archived successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error archiving task';
        showNotification(msg, 'error');
      });
  };

  // Category operations
  // Helper to map Tailwind color class to hex
  const tailwindToHex = (tw) => {
    const map = {
      'bg-blue-500': '#3b82f6',
      'bg-purple-500': '#a21caf',
      'bg-green-500': '#22c55e',
      'bg-orange-500': '#f97316',
      'bg-red-500': '#ef4444',
      'bg-pink-500': '#ec4899',
      'bg-indigo-500': '#6366f1',
      'bg-yellow-500': '#eab308'
    };
    return map[tw] || '#3b82f6';
  };

  const addCategory = () => {
    if (!categoryForm.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }

    api.post('/categories', {
      name: categoryForm.name.trim(),
      color: tailwindToHex(categoryForm.color)
    }, apiConfig)
      .then(res => {
        const cat = res.data.data.category;
        setCategories(prev => ([
          ...prev,
          { ...cat, id: cat._id || cat.id, count: 0 }
        ]));
        setCategoryForm({ name: '', color: 'bg-blue-500' });
        setShowCategoryModal(false);
        showNotification('Category added successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error adding category';
        showNotification(msg, 'error');
      });
  };

  const updateCategory = async () => {
    if (!editingCategory) return;
    
    // Don't allow editing default categories
    if (editingCategory.id.startsWith('default-')) {
      showNotification('Cannot modify default categories', 'error');
      return;
    }

    try {
      const res = await api.put(`/categories/${editingCategory.id}`, {
        name: categoryForm.name.trim(),
        color: tailwindToHex(categoryForm.color)
      }, apiConfig);

      setCategories(prev => prev.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...res.data.data.category } : cat
      ));
      setEditingCategory(null);
      setCategoryForm({ name: '', color: 'bg-blue-500' });
      setShowCategoryModal(false);
      showNotification('Category updated successfully!');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error updating category';
      showNotification(msg, 'error');
    }
  };

  const deleteCategory = async (categoryId) => {
    // Don't allow deleting default categories
    if (categoryId.startsWith('default-')) {
      showNotification('Cannot delete default categories', 'error');
      return;
    }

    try {
      await api.delete(`/categories/${categoryId}`, apiConfig);
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      showNotification('Category deleted successfully!');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error deleting category';
      showNotification(msg, 'error');
    }
  };

  const colorOptions = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500'
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  // Compute stats for dashboard cards
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed && !t.archived).length;
    const overdue = tasks.filter(t => !t.completed && !t.archived && t.dueDate && new Date(t.dueDate) < new Date()).length;
    const archived = tasks.filter(t => t.archived).length;
    return { total, completed, overdue, archived };
  };
  const stats = getStats();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hamburger Menu Button - Fixed position on left for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-2 left-4 z-50 p-3 bg-blue-600 rounded-xl shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-700 transition-all duration-200 md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-white" />
      </button>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 shadow-2xl
          md:static md:translate-x-0 md:w-72
        `}>
          <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {/* Sidebar Header */}
            <div className="px-6 py-6 border-b border-gray-800 sticky top-0 bg-gray-900/95 backdrop-blur-xl z-10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 md:hidden"
                >
                  <X size={22} />
                </button>
              </div>
              {/* User Info */}
              <div className="mt-6 flex items-center gap-3 p-4 bg-blue-600/20 rounded-xl border border-blue-700/30 shadow-inner backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-300">Welcome back!</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 py-6 bg-gray-900/95 backdrop-blur-xl">
              <div className="space-y-3">
                <button
                  onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800/80 hover:scale-[1.02] text-gray-300'}
                  `}
                >
                  <Home size={18} className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => { setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'tasks' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800/80 hover:scale-[1.02] text-gray-300'}
                  `}
                >
                  <CheckSquare size={18} className="mr-2" />
                  Tasks
                </button>
                <button
                  onClick={() => { setCurrentView('categories'); setSidebarOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'categories' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-800/80 hover:scale-[1.02] text-gray-300'}
                  `}
                >
                  <Folder size={18} className="mr-2" />
                  Categories
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin bg-gray-900/95 backdrop-blur-xl scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Quick Filters
                </h3>
                <button
                  onClick={() => { setFilterBy('all'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterBy === 'all' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => { setFilterBy('today'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterBy === 'today' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => { setFilterBy('upcoming'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterBy === 'upcoming' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => { setFilterBy('completed'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterBy === 'completed' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => { setFilterBy(category.name); setCurrentView('tasks'); setSidebarOpen(false); }}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all text-left ${
                        filterBy === category.name ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                        <span className="text-sm">{category.name}</span>
                        {category.id.startsWith('default-') && (
                          <span className="ml-2 text-xs text-gray-500 bg-gray-800/50 px-1.5 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-xl">
              <button
                onClick={() => openCategoryModal()}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-lg"
              >
                <Plus size={16} className="mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
            {/* Dashboard View */}
            {currentView === 'dashboard' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Dashboard</h1>
                  <p className="text-gray-400 text-lg">Welcome back! Here's your productivity overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 shadow-xl">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-blue-500/20 backdrop-blur-sm">
                        <CheckSquare className="text-blue-400" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300">Total Tasks</p>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 shadow-xl">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-green-500/20 backdrop-blur-sm">
                        <CheckCircle className="text-green-400" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300">Completed</p>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stats.completed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 shadow-xl">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-red-500/20 backdrop-blur-sm">
                        <AlertCircle className="text-red-400" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300">Overdue</p>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stats.overdue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 shadow-xl">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-purple-500/20 backdrop-blur-sm">
                        <Archive className="text-purple-400" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-300">Archived</p>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{stats.archived}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="bg-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-700/30 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Recent Tasks</h2>
                    <button
                      onClick={() => setCurrentView('tasks')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {tasks.filter(task => !task.archived).slice(0, 5).map(task => (
                      <div
                        key={task.id}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer border border-gray-700/30"
                        onClick={() => openTaskDetailsModal(task)}
                      >
                        <button
                          onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            task.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-500 hover:border-green-400'
                          }`}
                        >
                          {task.completed && <CheckCircle size={14} className="text-white" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-3 mt-2 flex-wrap">
                            {task.category && (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                              } text-white`}>
                                {task.category}
                              </span>
                            )}
                            {task.dueDate && (
                              <span className="text-xs text-gray-400 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tasks View */}
            {currentView === 'tasks' && (
              <div>
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
                        {filterBy === 'all' && 'All Tasks'}
                        {filterBy === 'today' && 'Today\'s Tasks'}
                        {filterBy === 'upcoming' && 'Upcoming Tasks'}
                        {filterBy === 'completed' && 'Completed Tasks'}
                        {categories.find(c => c.name === filterBy) && `${filterBy} Tasks`}
                      </h1>
                      <p className="text-gray-400 text-lg">{filteredTasks.length} tasks</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex rounded-xl overflow-hidden border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-4 py-2 text-sm font-medium transition-all ${
                            viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                          }`}
                        >
                          <List size={16} />
                        </button>
                        <button
                          onClick={() => setViewMode('kanban')}
                          className={`px-4 py-2 text-sm font-medium transition-all ${
                            viewMode === 'kanban' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-800/80 text-gray-300'
                          }`}
                        >
                          <Grid size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => openTaskModal()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center text-sm font-semibold shadow-lg"
                      >
                        <Plus size={16} className="mr-2" />
                        <span className="hidden sm:inline">Add Task</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-6">
                    {loadingTasks ? (
                      <div className="text-center text-gray-400 py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        Loading tasks...
                      </div>
                    ) : filteredTasks.length === 0 ? (
                      <div className="text-center text-gray-400 py-12">
                        <CheckSquare size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm">Create your first task to get started</p>
                      </div>
                    ) : (
                      filteredTasks.map(task => (
                        <div
                          key={task.id}
                          className="bg-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-700/30 p-6 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] hover:border-blue-600/50"
                          onClick={() => openTaskDetailsModal(task)}
                        >
                          <div className="flex items-start space-x-4">
                            <button
                              onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mt-1 ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 shadow-lg'
                                  : 'border-gray-500 hover:border-green-400 hover:bg-green-500/10'
                              }`}
                            >
                              {task.completed && <CheckCircle size={14} className="text-white" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-lg font-semibold mb-3 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-gray-400 mb-4 text-sm line-clamp-2">{task.description}</p>
                              )}
                              <div className="flex items-center space-x-3 flex-wrap gap-2">
                                {task.category && (
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                  } text-white shadow-sm`}>
                                    {task.category}
                                  </span>
                                )}
                                {task.dueDate && (
                                  <span className="text-xs text-gray-400 flex items-center">
                                    <Calendar size={12} className="mr-1" />
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <button
                                onClick={e => { e.stopPropagation(); openTaskModal(task); }}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                aria-label="Edit task"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                aria-label="Delete task"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Kanban View */}
                {viewMode === 'kanban' && (
                  <div className="overflow-x-auto">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center text-gray-400 py-12">
                        <Grid size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm">Create your first task to get started</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-full">
                        {['todo', 'in-progress', 'done'].map(status => {
                          const statusTasks = filteredTasks.filter(task => {
                            if (status === 'todo') return !task.completed && task.status !== 'in-progress';
                            if (status === 'in-progress') return task.status === 'in-progress';
                            if (status === 'done') return task.completed;
                            return false;
                          });
                          
                          return (
                            <div
                              key={status}
                              className="bg-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-700/30 p-6 flex flex-col min-h-[400px] shadow-xl"
                            >
                              <h3 className="font-semibold mb-6 capitalize text-lg text-white">
                                {status === 'in-progress' ? 'In Progress' : status === 'todo' ? 'To Do' : 'Done'}
                                <span className="ml-3 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                                  {statusTasks.length}
                                </span>
                              </h3>
                              <div className="space-y-4 flex-1">
                                {statusTasks.length === 0 ? (
                                  <div className="text-gray-500 text-sm text-center py-8">No tasks</div>
                                ) : (
                                  statusTasks.map(task => (
                                    <div 
                                      key={task.id} 
                                      className="bg-blue-600/30 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] border border-blue-700/30"
                                      onClick={() => openTaskDetailsModal(task)}
                                    >
                                      <div className="flex items-start justify-between mb-3">
                                        <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'} pr-2`}>
                                          {task.title}
                                        </h4>
                                        <div className="flex space-x-1 flex-shrink-0">
                                          <button
                                            onClick={e => { e.stopPropagation(); openTaskModal(task); }}
                                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                          >
                                            <Edit size={12} />
                                          </button>
                                          <button
                                            onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      </div>
                                      {task.description && (
                                        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                                      )}
                                      <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center space-x-2">
                                          {task.category && (
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                            } text-white shadow-sm`}>
                                              {task.category}
                                            </span>
                                          )}
                                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                                            {task.priority}
                                          </span>
                                        </div>
                                        {task.dueDate && (
                                          <span className="text-xs text-gray-400 flex items-center">
                                            <Calendar size={10} className="mr-1" />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                      <div className="mt-3 flex items-center">
                                        <button
                                          onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                                          className={`flex items-center text-xs font-medium transition-all ${
                                            task.completed
                                              ? 'text-green-400 hover:text-green-300'
                                              : 'text-gray-400 hover:text-green-400'
                                          }`}
                                        >
                                          <CheckCircle size={12} className="mr-1" />
                                          {task.completed ? 'Completed' : 'Mark Complete'}
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Categories View */}
            {currentView === 'categories' && (
              <div>
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white">Categories</h1>
                      <p className="text-gray-400 text-lg">Manage your task categories</p>
                    </div>

                    <button
                      onClick={() => openCategoryModal()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center text-sm font-semibold shadow-lg self-start sm:self-auto"
                    >
                      <Plus size={16} className="mr-2" />
                      <span className="hidden sm:inline">Add Category</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map(category => (
                    <div key={category.id} className="bg-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-700/30 p-6 hover:shadow-xl transition-all hover:scale-[1.02] hover:border-blue-600/50">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className={`w-4 h-4 rounded-full ${category.color} mr-3 flex-shrink-0 shadow-sm`}></div>
                          <h3 className="text-lg font-semibold truncate text-white">{category.name}</h3>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 ml-3">
                          {!category.id.startsWith('default-') ? (
                            <>
                              <button
                                onClick={() => openCategoryModal(category)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                aria-label="Edit category"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                aria-label="Delete category"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800/50 rounded-lg">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">{category.count}</p>
                        <p className="text-sm text-gray-400">
                          {category.count === 1 ? 'task' : 'tasks'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 rounded-2xl w-full max-w-md max-h-[90vh]  shadow-2xl border border-blue-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 rounded-t-2xl bg-blue-800 border-b border-blue-700 sticky top-0 z-10">
              <h2 className="text-xl font-bold tracking-tight text-white">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 hover:bg-blue-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <form className="p-6 space-y-6">
              {/* Title */}
              <div className="relative">
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base transition-all"
                  placeholder="Title *"
                  required
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Title *
                </label>
              </div>

              {/* Description */}
              <div className="relative">
                <textarea
                  value={taskForm.description}
                  onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                  rows={3}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base resize-none transition-all"
                  placeholder="Description"
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Description
                </label>
              </div>

              {/* Due Date */}
              <div className="relative">
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base transition-all"
                  placeholder="Due Date"
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Due Date
                </label>
              </div>

              {/* Priority */}
              <div className="relative">
                <select
                  value={taskForm.priority}
                  onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base transition-all appearance-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-focus:text-blue-200">
                  Priority
                </label>
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={taskForm.category}
                  onChange={e => setTaskForm({ ...taskForm, category: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base transition-all appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-focus:text-blue-200">
                  Category
                </label>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 px-6 py-5 border-t border-blue-800 bg-blue-950 rounded-b-2xl">
              <button
                onClick={editingTask ? updateTask : addTask}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base shadow-md"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 border-2 border-blue-800 text-blue-200 rounded-xl font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setCategoryForm({ ...categoryForm, color })}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color} border-2 transition-all ${
                        categoryForm.color === color ? 'border-white scale-110' : 'border-gray-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 p-4 sm:p-6 border-t border-gray-800">
              <button
                onClick={editingCategory ? updateCategory : addCategory}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h2 className="text-lg sm:text-xl font-semibold">Task Details</h2>
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <span className="block text-xs text-gray-400 mb-1">Title</span>
                <div className="text-base sm:text-lg font-bold mb-2">{selectedTask.title}</div>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Description</span>
                <div className="text-gray-300 mb-2 text-sm sm:text-base">{selectedTask.description || '—'}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Due Date</span>
                  <div className="text-gray-300 text-sm">
                    {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : '—'}
                  </div>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Priority</span>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${priorityColors[selectedTask.priority]}`}>
                    {selectedTask.priority}
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Category</span>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  categories.find(c => c.name === selectedTask.category)?.color || 'bg-gray-500'
                } text-white`}>
                  {selectedTask.category || '—'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Status</span>
                  <div className="text-gray-300 text-sm">{selectedTask.completed ? 'Completed' : 'Pending'}</div>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Created</span>
                  <div className="text-gray-300 text-sm">
                    {selectedTask.createdAt ? new Date(selectedTask.createdAt).toLocaleDateString() : '—'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-4 sm:p-6 border-t border-gray-800">
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Task Button - Only visible on mobile when in tasks view */}
      {currentView === 'tasks' && (
        <button
          onClick={() => openTaskModal()}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40 md:hidden"
          aria-label="Add new task"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg transition-all transform ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle size={16} className="mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
