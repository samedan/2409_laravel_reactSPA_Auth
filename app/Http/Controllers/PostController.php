<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller 
{

    public function __construct(){
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    // public static function middleware() 
    // {
    //     // return [new Middleware('auth:sanctum', except:['index', 'show']];
    //         // new Middleware('auth:sanctum', except: ['index', 'show']),
    //     return  new Middleware('auth', 'except' => ['confirmPage', 'confirmOrder', 'invoice']);
            
    //         // $this->middleware('guest', ['except' => [
    //         //     'redirectToFacebook', 'handleFacebookCallback', 'handleFacebookUnlink'
    //         // ]]);


       
    // }


    /** GET /api/posts
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::with("user")->latest()->get(); // get post with the user who created it
    }

    /** POST /api/posts/
     * Store a newly created resource in storage.
     */
    // public function store(StorePostRequest $request)
    public function store(Request $request) 
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        // $post = Post::create($fields);

        $post = $request->user()->posts()->create($fields);
        return [
            'post' => $post,
            'user' => $post->user
        ];
        
    }

    /** GET /api/posts/{post}
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return $post;
        return [
            'post' => $post,
            'user' => $post->user
        ];
    }

    /** PUT /api/posts/{post}
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post); // 'modify' function declared in PostPolicy.php

        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);
        $post->update($fields);
        // return $post;
        return [
            'post' => $post,
            'user' => $post->user
        ];
    }

    /** DELETE /api/posts/{post}
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post); // 'modify' function declared in PostPolicy.php
        $post->delete();
        return ['message' => "Post deleted"];
    }
}
