'use strict'
var ipc = require('ipc');
var domready = require('domready')
var React = require('react')

function createRect (a, b) {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  }
}

var App = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      cropping: false,
      downPoint: {},
      rect: {}
    }
  },

  render: function () {
    var self = this

    return React.DOM.div({
      className: 'window',
      onMouseMove: function (e) {
        self.setState({
          x: e.clientX,
          y: e.clientY
        })

        if (!self.state.cropping) return

        self.setState({
          rect: createRect(
            self.state.downPoint,
            {
              x: e.clientX,
              y: e.clientY
            }
          )
        })
      },
      onMouseUp: function (e) {
        var r = self.state.rect
        var crop_rect = {"height":r.height, "width": r.width, "top": r.y, "left": r.x}
        ipc.on('post-reply', function(arg){
            console.log(arg);
        });
        ipc.send('post-message', crop_rect);
        self.setState({ cropping: false, rect: {} })
      },
      onMouseDown: function (e) {
        self.setState({ downPoint: { x: e.clientX, y: e.clientY }, cropping: true })
      }
    }, [
      React.DOM.div(
        {
          className: 'rect',
          key: 'rect',
          style: { left: self.state.rect.x, top: self.state.rect.y, width: self.state.rect.width, height: self.state.rect.height }
        }
      ),
      React.DOM.div(
        {
          className: 'cursor',
          key: 'cursor',
          style: { left: self.state.x, top: self.state.y }
        },
        React.DOM.div({ className: 'indicator'}, self.state.x+"\n"+self.state.y)
      )
    ])
  }
})


domready(function () {
  React.render(React.createFactory(App)(), document.querySelector('body'))
})

