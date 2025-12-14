FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["API.Clients.csproj", "./"]
RUN dotnet restore "API.Clients.csproj"

COPY . .
RUN dotnet build "API.Clients.csproj" -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/build .

EXPOSE 80 5001

ENTRYPOINT ["dotnet", "API.Clients.dll"]
