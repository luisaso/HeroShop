using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeroShop.API.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductShoppingCarts_ShoppingCarts_ShoppingCartId",
                table: "ProductShoppingCarts");

            migrationBuilder.RenameColumn(
                name: "ProductsProductId",
                table: "ProductShoppingCarts",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "ProductShoppingCarts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductShoppingCarts_ShoppingCarts_ShoppingCartId",
                table: "ProductShoppingCarts",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "ShoppingCartId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductShoppingCarts_ShoppingCarts_ShoppingCartId",
                table: "ProductShoppingCarts");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductShoppingCarts",
                newName: "ProductsProductId");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "ProductShoppingCarts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductShoppingCarts_ShoppingCarts_ShoppingCartId",
                table: "ProductShoppingCarts",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "ShoppingCartId");
        }
    }
}
