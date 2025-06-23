<div className="flex mb-4">
        <input
          type="text"
          key= {id}
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          placeholder="Update tasks..."
          className="flex-1 p-2 border rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && updateTodos(id, updateText)}
        />
        <button 
          onClick={updateTodos(id, updateText)}
          className="bg-gray-500 text-white p-2 rounded-r hover:bg-gray-600 flex items-center"
        >
          <FaSearch />
        </button>
      </div>
