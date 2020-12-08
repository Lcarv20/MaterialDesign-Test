package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Initiating fiber
	app := fiber.New()
	PORT := ":8080"

	app.Static("/", "dist")

	app.Get("/test", func(c *fiber.Ctx) error {
		fmt.Printf(c.Request().URI().String())
		return c.SendString("Hello, World!")
	})

	app.Listen(PORT)

}
