//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [itemText, setItemText] = useState('');
    const [dateText, setDateText] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');
    const [updateDateText, setUpdateDateText] = useState('');

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/item', { item: itemText, date: dateText });
            setListItems(prev => [...prev, res.data]);
            setItemText('');
            setDateText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {

                const res = await axios.get('http://localhost:5000/api/items')
                setListItems(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList();
    }, []);

    const deleteItem = async (id) => {
        try {
                            // eslint-disable-next-line
            const res = await axios.delete(`http://localhost:5000/api/item/${id}`);
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    const updateItem = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`, { item: updateItemText, date: updateDateText })
            
            console.log(res.data);
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            updateItemText = listItems[updatedItemIndex].item;
            updateDateText = listItems[updatedItemIndex].date;
            setUpdateItemText('');
            setUpdateDateText('');
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }

    const renderUpdateForm = () => (
        <form className="update-form" onSubmit={(e) => {updateItem(e) } }>
            <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
            <input className="update-new-date" type="date" onChange={e => { setUpdateDateText(e.target.value) }} value={updateDateText } />
            <button className="update-new-btn" type="submit">Update</button>
        </form>
    );

  return (
      <div className="App">
    <h1>Todo List</h1>
          <form className="form" onSubmit={e => addItem(e) }>
              <input type="text" placeholder="Add Todo Item" onChange={
                  e => { setItemText(e.target.value) } 
              } value={itemText} />
              <input type="date" onChange={
                  e => { setDateText(e.target.value) }
              } value={dateText} />
        <button type="submit">Add</button>
          </form>
          <div className="todo-listItems">
              {
                  listItems.map(item => (
                      <div className="todo-item">
                          {
                              isUpdating === item._id
                                  ? renderUpdateForm()
                                  : <>
                                      <p className="item-content">{item.item}</p>
                                      <p className="date-content">{item.date.substring(0, 10).split('-').reverse().join('-')}</p>
                                      <button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                      <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                                    </>
                          }
                      

                  </div>
                  ))
              }
           
          </div>
      </div>
      
  );
}

export default App;
