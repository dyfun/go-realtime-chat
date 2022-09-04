package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

func main() {
	r := gin.Default()
	m := melody.New()
	r.StaticFile("/main.js", "./public/main.js")
	r.StaticFile("/style.css", "./public/style.css")

	r.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./public/index.html")
	})

	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		m.Broadcast(msg)
	})

	r.Run(":8080")
}
