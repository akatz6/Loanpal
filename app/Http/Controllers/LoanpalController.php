<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class LoanpalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $data = [];
      $data['service'] = DB::table('servicingdata')->get();
      $data['loans'] = DB::table('loandata')->get();
      return view('welcome', $data);
    }
}
