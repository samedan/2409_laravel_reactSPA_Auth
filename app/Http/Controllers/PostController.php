<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

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
        return Post::all();
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
        return $post;
        
    }

    /** GET /api/posts/{post}
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return $post;
    }

    /** PUT /api/posts/{post}
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);
        $post->update($fields);
        return $post;
    }

    /** DELETE /api/posts/{post}
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return ['message' => "Post deleted"];
    }
}
