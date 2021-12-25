package main

import (
	"embed"
	"flag"
	"github.com/gin-gonic/gin"
	"html/template"
	"log"
	"os"
	"strconv"
)

var (
	port = flag.Int("port", 3000, "specify the server listening port.")
	Host = flag.String("host", "localhost", "the server's ip address or domain")
)

var ServerUrl = ""

//go:embed public
var fs embed.FS

func init() {

}

func loadTemplate() *template.Template {
	t := template.Must(template.New("").ParseFS(fs, "public/*.html"))
	return t
}

func main() {
	if os.Getenv("GIN_MODE") != "debug" {
		gin.SetMode(gin.ReleaseMode)
	}
	flag.Parse()

	server := gin.Default()
	server.SetHTMLTemplate(loadTemplate())
	SetIndexRouter(server)
	SetApiRouter(server)

	hub := newHub()
	go hub.run()
	server.GET("/ws", func(c *gin.Context) {
		serveWs(hub, c.Writer, c.Request)
	})

	var realPort = os.Getenv("PORT")
	if realPort == "" {
		realPort = strconv.Itoa(*port)
	}
	if *Host == "localhost" {
		ip := getIp()
		if ip != "" {
			*Host = ip
		}
	}
	ServerUrl = "http://" + *Host + ":" + realPort + "/"
	openBrowser(ServerUrl)
	err := server.Run(":" + realPort)
	if err != nil {
		log.Println(err)
	}
}
