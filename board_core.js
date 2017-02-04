const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideItem = this.hideItem.bind(this);
    this.state = { items: [], text: '' };
  }

  render() {
    this.state.items = this.state.items == null ? [] : this.state.items;      
    return React.createElement(
      'div',
      null,
      React.createElement(TodoList, 
        { items: this.state.items, onhide: this.hideItem }),
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', { onChange: this.handleChange, value: this.state.text }),
        React.createElement(
          'button',
          null,
          'Add #' + (this.state.items.length + 1)
        )
      )
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      hidden: false,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
    setTimeout(function(a) {
      setFirebaseItem(KEY_TODO, widgetTodo.state.items);
    }, 50);
  }
    
  hideItem(e) {
    console.log(e, this);
    for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i].id === e) {
            this.state.items[i].hidden = !this.state.items[i].hidden;       
        }
    }
    this.setState(prevState => prevState);
    setFirebaseItem(KEY_TODO, widgetTodo.state.items);
  }
}

class TodoList extends React.Component {
  render() {      
    return React.createElement(
      'ul',
      null,
      this.props.items.map(item => React.createElement(
        'li',
        { key: item.id, className: 'todolist' },
        React.createElement(
            'input',
            { key: item.id, onClick: this.props.onhide.bind('itemid', item.id), type: 'checkbox', checked: item.hidden }
            ),
        React.createElement(
            'span',
            { key: item.id + 1, className: item.hidden ? "check-hidden" : "" },
            item.text
            )
      ))
    );
  }
}

class NotesApp extends TodoApp {
    render() {
        this.state.items = this.state.items == null ? [] : this.state.items;
        return React.createElement(
          'div',
          null,
          React.createElement(NotesList, { items: this.state.items, onhide: this.hideItem }),
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('input', { onChange: this.handleChange, value: this.state.text }),
            React.createElement(
              'button',
              null,
              'Add Note'
            )
          )
        );
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
          text: this.state.text,
          hidden: false,
          id: Date.now()
        };
        this.setState(prevState => ({
          items: prevState.items.concat(newItem),
          text: ''
        }));
        setTimeout(function(a) {
          setFirebaseItem(KEY_NOTES, widgetNotes.state.items);
        }, 50);
      }
    
    hideItem(e) {
        console.log(e, this);
        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].id === e) {
                this.state.items.splice(i, 1);       
            }
        }
        this.setState(prevState => prevState);
        setFirebaseItem(KEY_NOTES, widgetNotes.state.items);
    }
}

class NotesList extends TodoList {
      render() {
        return React.createElement(
          'ul',
          null,
          this.props.items.map(item => React.createElement(
            'li',
            { key: item.id, className: 'noteslist' },
            React.createElement(
                'span',
                {},
                item.text
                ),
            React.createElement(
                'img',
                {src: 'images/delete.png', width:'16px', onClick: this.props.onhide.bind('itemid', item.id), className: 'delete-item'},
                null
                )
          ))
        );
      }
}

class BookmarksApp extends NotesApp {
    render() {
        this.state.items = this.state.items == null ? [] : this.state.items;
        return React.createElement(
          'div',
          null,
          React.createElement(BookmarksList, { items: this.state.items, onhide: this.hideItem }),
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('input', { onChange: this.handleChange.bind('label', this.state.label), value: this.state.label, placeholder: 'Link label', ref: 'label' }),
            React.createElement('input', { onChange: this.handleChange.bind('link', this.state.link), value: this.state.link, type: 'url', placeholder: 'Link URL', ref: 'link' }),
            React.createElement(
              'button',
              null,
              'Add Bookmark'
            )
          )
        );
    }
    
    handleChange(e, element) {
        console.log(this, this.refs.label.value);
        this.state.label = this.refs.label.value;
        this.state.link = this.refs.link.value;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
          link: this.state.link,
          label: this.state.label,
          id: Date.now()
        };
        this.setState(prevState => ({
          items: prevState.items.concat(newItem),
          label: '',
          link: ''
        }));
        setTimeout(function(a) {
          setFirebaseItem(KEY_BOOKMARKS, widgetBookmarks.state.items);
        }, 50);
      }
    
    hideItem(e) {
        console.log(e, this);
        for (var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].id === e) {
                this.state.items.splice(i, 1);       
            }
        }
        this.setState(prevState => prevState);
        setFirebaseItem(KEY_BOOKMARKS, widgetBookmarks.state.items);
    }
}

class BookmarksList extends NotesList {
      render() {
        return React.createElement(
          'ul',
          null,
          this.props.items.map(item => React.createElement(
            'li',
            { key: item.id, className: 'noteslist' },
            React.createElement(
                'a',
                {href: item.link, target: '_blank'},
                item.label
                ),
            React.createElement(
                'img',
                {src: 'images/delete.png', width:'16px', onClick: this.props.onhide.bind('itemid', item.id), className: 'delete-item'},
                null
                )
          ))
        );
      }
}

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Type some *markdown* here!' };
  }

  handleChange() {
    this.setState({ value: this.refs.textarea.value });
    console.log("Handle change", widgetMarkdown.state.value);
    setFirebaseItem(KEY_MARKDOWN, this.refs.textarea.value);
  }

  getRawMarkup() {
    var md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }

  render() {
      this.state.value = this.state.value == null ? "" : this.state.value;
    return React.createElement(
      "div",
      { className: "MarkdownEditor" },
      React.createElement(
        "h3",
        null,
        "Markdown Output"
      ),
      React.createElement("div", {
        className: "content md_out",
        ref: "render",
        dangerouslySetInnerHTML: this.getRawMarkup()
      }),
      React.createElement(
        "h3",
        null,
        "Markdown Text"
      ),
      React.createElement("textarea", {
        onBlur: this.handleChange,
        className: "md_in",
        ref: "textarea",
        defaultValue: this.state.value })
    );
  }
}

var widgetNotes = ReactDOM.render(React.createElement(NotesApp, null), document.getElementById('notes'));
var widgetTodo = ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('todo'));
var widgetBookmarks = ReactDOM.render(React.createElement(BookmarksApp, null), document.getElementById('bookmarks'));
var widgetMarkdown = ReactDOM.render(React.createElement(MarkdownEditor, null), document.getElementById('markdown'));

function connectToFirebase() {
    addFirebaseListener(KEY_NOTES, function(value) {
        console.log(KEY_NOTES, value);
        widgetNotes.setState(prevState => ({
            items: value,
            text: prevState.text
        }));
    });   
    addFirebaseListener(KEY_TODO, function(value) {
        console.log(KEY_TODO, value);
        widgetTodo.setState(prevState => ({
            items: value,
            text: prevState.text
        }));
    });
    addFirebaseListener(KEY_BOOKMARKS, function(value) {
        console.log(KEY_BOOKMARKS, value);
        widgetBookmarks.setState(prevState => ({
            items: value,
            link: prevState.link,
            label: prevState.label
        }));
    });
    addFirebaseListener(KEY_MARKDOWN, function(value) {
        console.log(KEY_MARKDOWN, value);
        widgetMarkdown.setState(prevState => ({
            value: value
        }));
        widgetMarkdown.refs.textarea.value = value;
    });
}