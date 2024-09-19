### Source YouTube

> https://www.youtube.com/watch?v=LmMJB3STuU4&list=PL38wFHH4qYZUXLba1gx1l5r_qqMoVZmKM

# Source React Git :

> https://github.com/JonVadar/YouTube_videos/tree/main/Laravel%20Sanctum%20API%20series/laravel-api-react-app

# This Git

> https://github.com/samedan/2409_laravel_reactSPA_Auth

# Laravel install

> composer create-project laravel/laravel laravel-auth-react

# Laravel Sanctum

> composer require laravel/sanctum
> php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
> php artisan migrate

### Model & files

> php artisan make:model Post -a --api

### API Routes

> One line: api.php -> Route::apiResource('posts', PostController::class);
> php artisan route:list

### Accept header necessary

> ![App](https://github.com/samedan/2409_laravel_reactSPA_Auth/blob/main/public/images/printscreen1.jpg)

### Auth

> php artisan make:controller AuthController

### Add posts to Users and users to Posts

> User model -> posts() {return $this->hasMany(Post::class);}
> Post model -> user() {return $this->belongsTo(User::class);}
> change PostController -> store()

### Access or Not other user's Post

> PostPolicy.php -> function modify()

## Token expiration

> /app/config/sanctum.php ->

### ////////////////////////////////////

### Installed react (vite), TailwindCSS, react-router-dom

## Vite backend URI

> react_folder/vite.config.js -> server: {}

### Token Auth

## Register

> Get Token, set it in localStorage
> Load User data from DBB using the Token
> Save Token, User in context

### Home -> get All posts

> > Get post with the user who created it
> > PostController() -> return Post::with("user")->get();
