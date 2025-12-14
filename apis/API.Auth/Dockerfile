FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["API.Auth.csproj", "./"]
RUN dotnet restore "API.Auth.csproj"

COPY . .
RUN dotnet build "API.Auth.csproj" -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/build .

EXPOSE 80 5001

ENTRYPOINT ["dotnet", "API.Auth.dll"]
